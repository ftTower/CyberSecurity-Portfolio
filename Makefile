.PHONY: search clean

all: search

search:
	@echo "🔍 Indexing portfolio..."
	@python3 Utils/search_engine/indexer.py
	@echo "🚀 Starting search engine..."
	@python3 Utils/search_engine/server.py

clean:
	@rm -f Utils/search_engine/index.json
	@echo "✓ Cleaned index files"
