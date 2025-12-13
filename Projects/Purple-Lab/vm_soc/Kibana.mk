.SILENT:

Kibana_update:
	sudo apt update && sudo apt upgrade -y

Kibana_dep :
	# Install required dependencies first
	sudo apt-get update
	sudo apt-get install curl gnupg apt-transport-https -y
	# Add Elastic repository if not already present
	@if ! test -f /usr/share/keyrings/elasticsearch-keyring.gpg; then \
		curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg; \
	fi
	@if ! grep -q "artifacts.elastic.co" /etc/apt/sources.list.d/elastic-7.x.list 2>/dev/null; then \
		echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list; \
	fi
	sudo apt update
	sudo apt-get install kibana nginx -y

Kibana :
	sudo systemctl enable kibana
	sudo systemctl start kibana


Kibana_reverse_proxy:
	echo "$(YELLOW)Configuring a Reverse Proxy for kibana...$(NC)"
	@/bin/bash -c 'read -p "Enter username: " username; \
	read -s -p "Enter password: " password; \
	echo; \
	sudo mkdir -p /etc/nginx; \
	echo "$$username:`echo $$password | openssl passwd -apr1 -stdin`" | sudo tee -a /etc/nginx/htpasswd.users'
	echo "$(BLUE)Getting domain or public IP...$(NC)"
	@domain=$$(hostname -f 2>/dev/null | grep -E '^[^.]+\.[^.]+' || echo ""); \
	if [ -z "$$domain" ]; then \
		echo "$(YELLOW)No domain found, getting public IP...$(NC)"; \
		public_ip=$$(curl -s https://ipinfo.io/ip 2>/dev/null || curl -s https://icanhazip.com 2>/dev/null || curl -s https://ifconfig.me 2>/dev/null || echo "localhost"); \
		domain=$$public_ip; \
	fi; \
	echo "$(GREEN)Using: $$domain$(NC)"; \
	sudo cp ./vm_soc/conf_kibana /etc/nginx/sites-available/kibana; \
	sudo sed -i "s/your_domain/$$domain/g" /etc/nginx/sites-available/kibana; \
	sudo mkdir -p /etc/nginx/sites-enabled; \
	sudo rm -f /etc/nginx/sites-enabled/default; \
	sudo ln -sf /etc/nginx/sites-available/kibana /etc/nginx/sites-enabled/; \
	sudo nginx -t && sudo systemctl reload nginx; \
	echo "$(GREEN)Kibana reverse proxy configured with domain/IP: $$domain$(NC)"; \
	echo "$(BLUE)Access Kibana at: http://$$domain$(NC)"

kibana_msg :
	echo "$(FOCUS)Successfully installed and configured Kibana$(NC)"

kibana_all: Kibana_update
	make Kibana_dep
	make Kibana
	make Kibana_reverse_proxy
	make kibana_msg
	