# Purple-Lab (IN PROGRESS)

![Banner](https://github.com/ftTower/ftTower/blob/main/assets/Purple-lab/banner.png)

This is my first try installing and using Defense mechanisms in a computer (box in this case).

The goal is to setup a defense mechanism and use it to monitor/ defend a victim vm (Windows Server) from an attacker vm.

```bash
.
├── Makefile
├── README.md
└── vm_soc
    ├── conf_elastic_s.yml
    ├── conf_kibana
    ├── Elasticsearch.mk
    ├── Kibana.mk
    └── README.md

```

## Setup

### iso 

linux            : https://releases.ubuntu.com/24.04.3/ubuntu-24.04.3-desktop-amd64.iso

kali             : https://cdimage.kali.org/kali-2025.3/kali-linux-2025.3-virtualbox-amd64.7z

windows Server   : https://go.microsoft.com/fwlink/?linkid=2273506


## source

setup elastic stack : 
https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elastic-stack-on-ubuntu-20-04

elastic security :
https://www.elastic.co/guide/en/elasticsearch/reference/7.16/configuring-stack-security.html