.SILENT:

PYTHON := python3
SCRIPT := ft_otp.py


HEXA_KEY_FILE := key.hex
CRYPTED_KEY_FILE := ft_otp.key

clear:
	clear

clean: clear
	rm -f $(HEXA_KEY_FILE)
	rm -f $(CRYPTED_KEY_FILE)

generate_file: clean
	touch $(HEXA_KEY_FILE)
	head -c 32 /dev/urandom | xxd -p | tr -d '\n' > $(HEXA_KEY_FILE)
	cat $(HEXA_KEY_FILE) && echo

g  : generate_file
	$(PYTHON) $(SCRIPT) -g $(HEXA_KEY_FILE)

k  : 
	$(PYTHON) $(SCRIPT) -k $(CRYPTED_KEY_FILE)


all : g k

.PHONY: run