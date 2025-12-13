.SILENT:

SPI_NAME = spider.py
SCO_NAME = scorpion.py

IMG_DIR = $(CURDIR)/data

.PHONY: run clean


clear:
	clear

run:
	echo
	@while read url; do \
		python3 $(SPI_NAME) -r -l 1 "$$url"; \
	done < scrapSite.txt
	echo

metadata: clear
	echo
	@find $(IMG_DIR) -type f -name "*.jpg" -o -name "*.png" | while read imgpath; do \
		python3 $(SCO_NAME) "$$imgpath"; \
	done

clean:
	rm -rf $(CURDIR)/data

all : clean clear run metadata clean


re: clear clean run

