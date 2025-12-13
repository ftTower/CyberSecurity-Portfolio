include ./vm_soc/*.mk

GREEN = \033[32m
RED = \033[31m
YELLOW = \033[33m
BLUE = \033[34m

NC = \033[0m

FOCUS = $(BLINK)$(RED)

update :
	sudo apt update && sudo apt-get upgrade -y && sudo apt-get install git make vim -y && clear


finish_msg :
	echo "\n\n$(FOCUS)installation Finished ! $(NC)"
	echo "$(YELLOW)Kibana page :$(NC) http://localhost/"

soc: update
	make elastic_search_all && make kibana_all && make finish_msg
