# Security Operations Center Setup

# About

This version is a demonstration, if you want to use it in a real production, you have to change the 'vm_soc/conf_kibana' because it listen on the port 80 so it use http to transmit data.
(everyone on the network can sniff the password)

to adapt it in a real case scenario, you have to replace 80 by 443 ssl. It is the port for the https protocol who do no let packet in clear text.

1 - ensure to get a ssl certificate to authenticate.

A nonprofit providing free TLS certificates : https://letsencrypt.org/fr/

2 - change '80' by '443 ssl' and configure the ssl_certificate directives

3 - make a redirect from http port 80 to 443 https

### SOC tools 

```
Elasticstack
    Elastic Search - storage and search 
    Logstash       - processing and logs normalisation
    Kibana         - alert and visualisation
```

### ISO

linux used      : https://releases.ubuntu.com/24.04.3/ubuntu-24.04.3-desktop-amd64.iso

guest additions : https://download.virtualbox.org/virtualbox/7.0.22/VBoxGuestAdditions_7.0.22.iso
or
```
sudo apt-get install virtualbox-guest-additions-iso && reboot
```

# The Machine


## Vbox creation



## Ubuntu Configuration && Tools setup

Ensure VM use DHCP for the NAT network:

```
sudo bash -c 'cat <<EOF > /etc/network/interfaces
# Network interfaces configuration

source /etc/network/interfaces.d/*

auto lo
iface lo inet loopback

auto enp0s3
iface enp0s3 inet dhcp
EOF'
sudo systemctl restart networking
clear && ip a
```


```bash
    sudo apt update && sudo apt-get upgrade -y && sudo apt-get install git make && git clone https://github.com/ftTower/Purple-Lab.git && cd Purple-Lab && clear && pwd && ls && make soc 
```

