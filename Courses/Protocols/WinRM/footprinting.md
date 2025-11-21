# WINRM Footprinting

## Methods

### Scanning with Nmap

>WinRM uses TCP ports 5985 (HTTP) and 5986 (HTTPS) by default, which we can scan using Nmap. However, often we will see that only HTTP (TCP 5985) is used instead of HTTPS (TCP 5986).
```bash
nmap -sV -sC <ip_address> -p5985,5986 --disable-arp-ping -n
```

| Parameter | Description |
|-----------|-------------|
| `--disable-arp-ping` | Forces nmap to use other protocols (TCP/UDP) instead of ARP for host discovery |
| `-n` | No DNS resolution - Shows only IP addresses, not hostnames |




```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2021-11-06 16:31 CET
Nmap scan report for 10.129.201.248
Host is up (0.030s latency).

PORT     STATE SERVICE VERSION
5985/tcp open  http    Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 7.34 seconds
```

### [Evil-WinRM](https://github.com/Hackplayers/evil-winrm)

> The purpose of this program is to provide nice and easy-to-use features for hacking. It can be used with legitimate purposes by system administrators as well but the most of its features are focused on hacking/pentesting stuff.

clone the repository :
```bash
git clone https://github.com/Hackplayers/evil-winrm && cd ./evil-winrm
```
launch it :
```bash
evil-winrm -i <ip_address> -u <username> -p <password>
```
output :
```
Evil-WinRM shell v3.3

Warning: Remote path completions is disabled due to ruby limitation: quoting_detection_proc() function is unimplemented on this machine

Data: For more information, check Evil-WinRM Github: https://github.com/Hackplayers/evil-winrm#Remote-path-completion

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\Cry0l1t3\Documents>
```
