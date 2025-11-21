# Rsync Footprinting


## Methods

### Scanning for Rsync

```bash
sudo nmap -sV -p 873 <ip_address>
```
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2022-09-19 09:31 EDT
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0058s latency).

PORT    STATE SERVICE VERSION
873/tcp open  rsync   (protocol version 31)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 1.13 seconds
```
<p>In this case Rsync is working with the deamon port 873,
It is a very bad setup because packages are unencrypted. <br>
<b>Most of the time Rsync will be working over SSH on port 22.</b> </p>

### Probing for Accessible Shares

This can sometimes be done without authentication.

```bash
nc -nv <ip_address> 873
```
```bash
(UNKNOWN) [127.0.0.1] 873 (rsync) open
@RSYNCD: 31.0
@RSYNCD: 31.0
#list
dev            	Dev Tools
@RSYNCD: EXIT
```
Here we can see a share called dev, and we can enumerate it further.

### Enumerating an Open Share

```bash
rsync -av --list-only rsync://<ip_address>/<share name>
```

```bash
receiving incremental file list
drwxr-xr-x             48 2022/09/19 09:43:10 .
-rw-r--r--              0 2022/09/19 09:34:50 build.sh
-rw-r--r--              0 2022/09/19 09:36:02 secrets.yaml
drwx------             54 2022/09/19 09:43:10 .ssh 

sent 25 bytes  received 221 bytes  492.00 bytes/sec
total size is 0  speedup is 0.00
```