// State
let treeData = {};
let nodes = [];
let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let rootX = 15000; // Center X position of the tree
let rootY = 200;   // Top Y position of the tree
let openFolders = new Set(); // Track which folders are open (by path)
let currentLayout = null; // Store layout info for redrawing connections

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    loadTree();
    setupSearch();
    setupCanvas();
    setupControls();
});

// Load tree and create map
async function loadTree() {
    try {
        const response = await fetch('/api/tree');
        treeData = await response.json();
        
        console.log('Tree data loaded:', treeData);
        
        // Update stats
        const statsResponse = await fetch('/api/stats');
        const stats = await statsResponse.json();
        document.getElementById('total-files').textContent = stats.total_files;
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            createMap(treeData);
        }, 100);
    } catch (error) {
        console.error('Error loading tree:', error);
    }
}

// Calculate comprehensive tree metrics and optimal spacing
function calculateTreeMetrics(tree) {
    let maxDepth = 0;
    let totalNodes = 0;
    let levelStats = {};
    
    function traverse(node, depth = 0, parentPath = '') {
        maxDepth = Math.max(maxDepth, depth);
        totalNodes++;
        
        if (!levelStats[depth]) {
            levelStats[depth] = {
                maxChildren: 0,
                totalNodes: 0,
                maxSiblings: 0,
                nodes: []
            };
        }
        
        levelStats[depth].totalNodes++;
        
        if (node.children && node.children.length > 0) {
            levelStats[depth].maxChildren = Math.max(levelStats[depth].maxChildren, node.children.length);
            
            // Track sibling groups
            levelStats[depth].nodes.push({
                childCount: node.children.length,
                path: parentPath + '/' + (node.name || 'root')
            });
            
            node.children.forEach(child => traverse(child, depth + 1, parentPath + '/' + (node.name || 'root')));
        }
    }
    
    traverse(tree);
    
    // Calculate max siblings at each level
    Object.keys(levelStats).forEach(level => {
        const stats = levelStats[level];
        stats.maxSiblings = stats.maxChildren;
    });
    
    return { maxDepth, totalNodes, levelStats };
}

// Calculate the width required for a subtree (bottom-up approach)
// Only considers visible children (based on openFolders state)
function calculateSubtreeWidth(node, minNodeSpacing = 300, depth = 0) {
    const nodePath = node.path || '.';
    const isRoot = depth === 0;  // Root is always at depth 0
    const isFolderOpen = isRoot || openFolders.has(nodePath);
    
    // If folder is closed or no children, just return node width
    if (!isFolderOpen || !node.children || node.children.length === 0) {
        return { width: minNodeSpacing, positions: [] };
    }
    
    // Calculate width for visible children only (recursive)
    const childrenInfo = node.children.map(child => 
        calculateSubtreeWidth(child, minNodeSpacing, depth + 1)
    );
    
    // Total width is sum of all children widths
    const totalChildrenWidth = childrenInfo.reduce((sum, info) => sum + info.width, 0);
    
    // Position children left to right
    let currentX = 0;
    const childPositions = [];
    
    childrenInfo.forEach((info, index) => {
        // Each child is centered in its allocated space
        const childCenterX = currentX + info.width / 2;
        childPositions.push({
            x: childCenterX,
            subtreeWidth: info.width,
            childPositions: info.positions
        });
        currentX += info.width;
    });
    
    // Parent is centered over its children
    const nodeWidth = Math.max(minNodeSpacing, totalChildrenWidth);
    
    return {
        width: nodeWidth,
        positions: childPositions
    };
}

// Build tree with calculated positions
function buildTreeWithPositions(tree) {
    const minNodeSpacing = 350; // Espacement minimum entre nœuds
    const levelHeight = 500; // Hauteur entre niveaux
    
    // Calculate all positions bottom-up
    const treeLayout = calculateSubtreeWidth(tree, minNodeSpacing);
    
    console.log('Tree layout calculated:', treeLayout);
    
    // Now assign absolute positions top-down
    const positioned = [];
    
    function assignPositions(node, layoutInfo, absoluteX, absoluteY, depth = 0, parentPath = '') {
        const nodeInfo = {
            node: node,
            x: absoluteX,
            y: absoluteY,
            depth: depth,
            parentPath: parentPath
        };
        positioned.push(nodeInfo);
        
        // Position children (only if folder is open)
        const currentPath = node.path || '';
        const isRoot = depth === 0;
        const isFolderOpen = isRoot || openFolders.has(currentPath);
        
        if (isFolderOpen && node.children && node.children.length > 0 && layoutInfo.positions && layoutInfo.positions.length > 0) {
            const startX = absoluteX - (layoutInfo.width / 2);
            
            // layoutInfo.positions only has visible children, so iterate over that
            layoutInfo.positions.forEach((childLayout, index) => {
                const child = node.children[index];
                const childAbsoluteX = startX + childLayout.x;
                const childAbsoluteY = absoluteY + levelHeight;
                
                assignPositions(
                    child, 
                    { width: childLayout.subtreeWidth, positions: childLayout.childPositions },
                    childAbsoluteX,
                    childAbsoluteY,
                    depth + 1,
                    currentPath
                );
            });
        }
    }
    
    // Start from center of canvas
    const canvasWidth = Math.max(60000, treeLayout.width + 10000);
    const startX = canvasWidth / 2;
    const startY = 300;
    
    assignPositions(tree, treeLayout, startX, startY);
    
    return {
        positions: positioned,
        canvasWidth: canvasWidth,
        canvasHeight: 40000,
        rootX: startX,
        rootY: startY
    };
}

// Create visual map with intelligent bottom-up layout
function createMap(tree) {
    console.log('Creating map with bottom-up layout algorithm...');
    const container = document.getElementById('map-container');
    container.innerHTML = '';
    nodes = [];
    
    // Calculate positions using bottom-up algorithm
    const layout = buildTreeWithPositions(tree);
    currentLayout = { tree, layout }; // Store for later use
    console.log('Layout calculated:', layout);
    
    // Update global root position
    rootX = layout.rootX;
    rootY = layout.rootY;
    
    // Create SVG for connections
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', layout.canvasWidth.toString());
    svg.setAttribute('height', layout.canvasHeight.toString());
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    container.appendChild(svg);
    
    // Create all visible nodes (only nodes that should be shown based on openFolders state)
    layout.positions.forEach((posInfo, index) => {
        const node = posInfo.node;
        const isRoot = posInfo.depth === 0;
        const isFile = node.type === 'file';
        
        console.log(`Creating node at depth ${posInfo.depth}:`, node.name, 'at', posInfo.x, posInfo.y);
        
        const domNode = createNode({
            name: node.name || '🏠 CyberSecurity Portfolio',
            type: isRoot ? 'root' : (isFile ? 'file' : getNodeType(node.name)),
            path: node.path || '',
            x: posInfo.x,
            y: posInfo.y,
            icon: isRoot ? '' : (isFile ? '📄' : getNodeIcon(node.name)),
            isLarge: isRoot,
            isSmall: isFile,
            children: node.children,
            parentPath: posInfo.parentPath || ''
        });
        container.appendChild(domNode);
        // All nodes created are visible (filtering done in calculateSubtreeWidth)
    });
    
    // Draw connections between parent and children (only for visible/open nodes)
    function drawConnections(node, layoutInfo, parentX, parentY, depth = 0, parentPath = '') {
        const currentPath = node.path || '';
        
        // Only draw children connections if this folder is open (or if it's root)
        const isRoot = depth === 0;
        const shouldShowChildren = isRoot || openFolders.has(currentPath);
        
        if (shouldShowChildren && node.children && node.children.length > 0 && layoutInfo.positions) {
            const startX = parentX - (layoutInfo.width / 2);
            const childY = parentY + 500; // levelHeight
            
            node.children.forEach((child, index) => {
                const childLayout = layoutInfo.positions[index];
                const childX = startX + childLayout.x;
                
                // Draw connection line to direct child
                drawTreeConnection(svg, parentX, parentY + 60, childX, childY - 30);
                
                // Recurse for this child
                drawConnections(
                    child,
                    { width: childLayout.subtreeWidth, positions: childLayout.childPositions },
                    childX,
                    childY,
                    depth + 1,
                    currentPath
                );
            });
        }
    }
    
    // Start drawing connections from root
    const treeLayout = calculateSubtreeWidth(tree, 350);
    drawConnections(tree, treeLayout, layout.rootX, layout.rootY, 0, '');
    
    console.log('Total nodes created:', nodes.length);
    
    // Center view on root - position root in upper portion of viewport with zoom out
    const mapCard = document.querySelector('.map-card');
    const mapHeight = mapCard ? mapCard.offsetHeight : window.innerHeight;
    
    scale = 0.5; // Zoomed out at 50% for wider overview
    translateX = window.innerWidth / 2 - layout.rootX * scale;
    translateY = mapHeight * 0.1 - layout.rootY * scale; // Position root at 20% from top
    updateTransform();
}

// Create node element
function createNode(data) {
    const node = document.createElement('div');
    node.className = `node type-${data.type}`;
    
    // Add size variants
    if (data.isLarge) node.classList.add('node-large');
    if (data.isSmall) node.classList.add('node-small');
    
    node.style.left = `${data.x}px`;
    node.style.top = `${data.y}px`;
    node.style.position = 'absolute';
    node.dataset.path = data.path || '';
    
    console.log('Creating node:', data.name, 'at', data.x, data.y);
    
    if (data.icon) {
        const icon = document.createElement('span');
        icon.className = 'node-icon';
        icon.textContent = data.icon;
        node.appendChild(icon);
    }
    
    const title = document.createElement('div');
    title.className = 'node-title';
    title.textContent = data.name;
    node.appendChild(title);
    
    if (data.children && data.children.length > 0) {
        const subtitle = document.createElement('div');
        subtitle.className = 'node-subtitle';
        const isOpen = openFolders.has(data.path);
        const indicator = isOpen ? '▼' : '▶';
        subtitle.textContent = `${indicator} ${data.children.length} items`;
        node.appendChild(subtitle);
        
        // Store reference for updating later
        node.dataset.hasChildren = 'true';
    }
    
    node.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Node clicked:', data.name, data.path);
        
        // If it's a folder (not a file and not root), toggle open/close
        if (data.type !== 'file' && data.type !== 'root' && data.children && data.children.length > 0) {
            toggleFolder(data.path);
            
            // Update indicator
            const subtitle = node.querySelector('.node-subtitle');
            if (subtitle) {
                const isOpen = openFolders.has(data.path);
                const indicator = isOpen ? '▼' : '▶';
                subtitle.textContent = `${indicator} ${data.children.length} items`;
            }
        }
        // If it's a file, open it
        else if (data.type === 'file' && data.path) {
            openNode(data.path);
        }
        
        setActiveNode(node);
    });
    
    nodes.push({ element: node, data: data });
    
    return node;
}

// Draw tree-style connection (vertical then horizontal)
function drawTreeConnection(svg, x1, y1, x2, y2) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Calculate control points for smooth bezier curves
    const midY = (y1 + y2) / 2;
    const offset = Math.abs(x2 - x1) * 0.15; // Dynamic curve based on distance
    
    // Elegant bezier curve
    const d = `M ${x1} ${y1} 
               C ${x1} ${y1 + offset}, ${x1} ${midY - offset}, ${x1} ${midY}
               L ${x2} ${midY}
               C ${x2} ${midY + offset}, ${x2} ${y2 - offset}, ${x2} ${y2}`;
    
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'rgba(99, 102, 241, 0.3)');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('class', 'connection');
    
    svg.appendChild(path);
}

// Toggle folder open/close
function toggleFolder(folderPath) {
    console.log('Toggling folder:', folderPath);
    
    if (openFolders.has(folderPath)) {
        // Close folder
        openFolders.delete(folderPath);
        // Close all descendants too
        closeAllDescendants(folderPath);
    } else {
        // Open folder
        openFolders.add(folderPath);
    }
    
    // Recreate the entire map with new layout
    recreateMap();
}

// Close all descendants of a folder
function closeAllDescendants(folderPath) {
    nodes.forEach(({ data }) => {
        if (data.path && data.path.startsWith(folderPath + '/')) {
            openFolders.delete(data.path);
        }
    });
}

// Recreate the map with current folder states
function recreateMap() {
    if (!treeData || !treeData.name) return;
    
    // Store current viewport position
    const currentTranslateX = translateX;
    const currentTranslateY = translateY;
    const currentScale = scale;
    
    // Recreate map
    createMap(treeData);
    
    // Restore viewport position
    translateX = currentTranslateX;
    translateY = currentTranslateY;
    scale = currentScale;
    updateTransform();
}

// Get node type based on name
function getNodeType(name) {
    if (name === 'Protocols') return 'protocol';
    if (name === 'Labs') return 'lab';
    if (name === 'Utils') return 'util';
    return 'folder';
}

// Get node icon - Enhanced with better icons
function getNodeIcon(name) {
    // Main categories
    const categoryIcons = {
        'Protocols': '🌐',
        'Labs': '🧪',
        'Utils': '⚙️',
        'Courses': '📚',
        'Tools': '🔧',
    };
    
    // Protocol specific
    const protocolIcons = {
        'SSH': '🔐',
        'RDP': '🖥️',
        'SMB': '📂',
        'FTP': '📤',
        'HTTP': '🌐',
        'HTTPS': '🔒',
        'DNS': '🗂️',
        'SMTP': '📧',
        'R-Services': '⚡',
        'Rsync': '🔄',
        'WinRM': '🪟',
        'WMI': '🔮'
    };
    
    // File types
    if (name.endsWith('.md')) return '📝';
    if (name.endsWith('.sh')) return '⚡';
    if (name.endsWith('.py')) return '🐍';
    if (name.endsWith('.js')) return '💛';
    if (name.endsWith('.json')) return '📋';
    if (name.endsWith('.txt')) return '📄';
    if (name.endsWith('.pdf')) return '📕';
    
    // Check category icons first
    if (categoryIcons[name]) return categoryIcons[name];
    
    // Check protocol icons
    if (protocolIcons[name]) return protocolIcons[name];
    
    // Default folder
    return '📁';
}

// Set active node
function setActiveNode(node) {
    document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
    node.classList.add('active');
}

// Open node details
async function openNode(path) {
    try {
        const response = await fetch(`/api/file/${encodeURIComponent(path)}`);
        const fileData = await response.json();
        
        if (fileData.error) return;
        
        const panel = document.getElementById('detail-panel');
        const content = document.getElementById('panel-content');
        
        content.innerHTML = `
            <h2>${fileData.title}</h2>
            <div class="meta">📁 ${fileData.path}</div>
            <div class="content-preview">${fileData.content.substring(0, 500)}...</div>
            ${fileData.headers.length > 0 ? `
                <h3>Sections</h3>
                <ul style="margin: 0.5rem 0 1rem 1.5rem; color: var(--text-secondary);">
                    ${fileData.headers.slice(0, 5).map(h => `<li>${h}</li>`).join('')}
                </ul>
            ` : ''}
            <div class="actions">
                <button class="btn" onclick="copyPath('${fileData.full_path}')">📋 Copy</button>
                <a class="btn" href="${fileData.github_url}" target="_blank">🔗 GitHub</a>
            </div>
        `;
        
        panel.classList.remove('hidden');
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

// Close panel
function closePanel() {
    document.getElementById('detail-panel').classList.add('hidden');
    document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
}

// Copy path
function copyPath(path) {
    navigator.clipboard.writeText(path);
    alert('Path copied!');
}

// Setup canvas dragging
function setupCanvas() {
    const canvas = document.getElementById('canvas');
    const container = document.getElementById('map-container');
    
    canvas.addEventListener('mousedown', (e) => {
        if (e.target === canvas || e.target === container) {
            isDragging = true;
            dragStartX = e.clientX - translateX;
            dragStartY = e.clientY - translateY;
            canvas.classList.add('grabbing');
        }
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            translateX = e.clientX - dragStartX;
            translateY = e.clientY - dragStartY;
            updateTransform();
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        isDragging = false;
        canvas.classList.remove('grabbing');
    });
    
    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
        canvas.classList.remove('grabbing');
    });
    
    // Wheel zoom with proper center point
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate mouse position in canvas space
        const canvasX = (mouseX - translateX) / scale;
        const canvasY = (mouseY - translateY) / scale;
        
        // Apply zoom
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(0.3, Math.min(3, scale * delta));
        
        // Adjust translation to keep mouse position stable
        translateX = mouseX - canvasX * newScale;
        translateY = mouseY - canvasY * newScale;
        scale = newScale;
        
        updateTransform();
    }, { passive: false });
}

// Update transform
function updateTransform() {
    const container = document.getElementById('map-container');
    container.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// Controls
function setupControls() {
    // Already defined as global functions
}
function resetView() {
    scale = 1;
    // Center on root position
    translateX = window.innerWidth / 2 - rootX;
    translateY = 100;
    updateTransform();
}

function zoomIn() {
    scale = Math.min(3, scale * 1.2);
    updateTransform();
}

function zoomOut() {
    scale = Math.max(0.3, scale * 0.8);
    updateTransform();
}

// Setup search
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (query.length < 2) {
            resultsContainer.classList.remove('show');
            return;
        }
        
        searchTimeout = setTimeout(() => performSearch(query), 300);
    });
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
            resultsContainer.classList.remove('show');
        }
    });
}

// Perform search
async function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    const recommendedContainer = document.getElementById('recommended-content');
    
    try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const results = await response.json();
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item" style="text-align: center; color: var(--text-muted);">No results found</div>';
            resultsContainer.style.display = 'block';
        } else {
            // Show top 5 in dropdown
            resultsContainer.innerHTML = results.slice(0, 5).map(result => `
                <div class="search-result-item" onclick="selectSearchResult('${result.path}')">
                    <div class="result-name">${result.title}</div>
                    <div class="result-path">${result.path}</div>
                </div>
            `).join('');
            resultsContainer.style.display = 'block';
            
            // Show top 3 in recommended
            recommendedContainer.innerHTML = results.slice(0, 3).map(result => `
                <div class="recommended-item" onclick="selectSearchResult('${result.path}')">
                    <div class="result-name">📄 ${result.title}</div>
                    <div class="result-path">${result.path}</div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Search error:', error);
        resultsContainer.innerHTML = '<div class="search-result-item" style="color: #ff6b6b;">Error performing search</div>';
    }
}

// Search for specific term (used by quick links)
function searchFor(query) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = query;
    searchInput.focus();
    performSearch(query);
}

// Select search result
function selectSearchResult(path) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.style.display = 'none';
    openNode(path);
    
    // Highlight node
    const node = document.querySelector(`[data-path="${path}"]`);
    if (node) {
        setActiveNode(node);
        // Center on node
        const rect = node.getBoundingClientRect();
        translateX = window.innerWidth / 2 - rect.left;
        translateY = window.innerHeight / 2 - rect.top;
        updateTransform();
    }
}

// Open node details
function openNode(path) {
    fetch(`/api/file/${encodeURIComponent(path)}`)
        .then(response => response.json())
        .then(data => {
            showDetail(data);
        })
        .catch(error => {
            console.error('Error loading file:', error);
        });
}

// Show detail panel
function showDetail(data) {
    const panel = document.getElementById('detail-panel');
    const title = document.getElementById('detail-title');
    const content = document.getElementById('detail-content');
    
    title.textContent = data.name || 'Details';
    
    let html = `
        <div style="margin-bottom: 16px;">
            <strong>Path:</strong> ${data.path || 'N/A'}
        </div>
    `;
    
    if (data.content) {
        html += `
            <div style="margin-bottom: 16px;">
                <strong>Content:</strong>
            </div>
            <pre style="background: rgba(0,0,0,0.3); padding: 16px; border-radius: 8px; overflow-x: auto; max-height: 400px;">${data.content}</pre>
        `;
    }
    
    content.innerHTML = html;
    panel.classList.remove('hidden');
}

// Close detail panel
function closeDetail() {
    document.getElementById('detail-panel').classList.add('hidden');
    document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
}
