## First part

### Table of Contents
1. [Objective](#objective)
2. [Initial Reconnaissance](#initial-reconnaissance)
  - [Nmap Scan](#nmap-scan)
  - [Port Analysis](#port-analysis)
3. [Service Enumeration](#service-enumeration)
  - [SSH Enumeration](#ssh-enumeration)
  - [FTP Enumeration](#ftp-enumeration)
4. [Exploitation](#exploitation)
  - [FTP Access](#ftp-access)
  - [SSH Key Extraction](#ssh-key-extraction)
  - [SSH Connection](#ssh-connection)
5. [Flag Capture](#flag-capture)

---

### Objective

### `subject :`
```
We were commissioned by the company Inlanefreight Ltd to test three different servers in their internal network. The company uses many different services, and the IT security department felt that a penetration test was necessary to gain insight into their overall security posture.

The first server is an internal DNS server that needs to be investigated. In particular, our client wants to know what information we can get out of these services and how this information could be used against its infrastructure. Our goal is to gather as much information as possible about the server and find ways to use that information against the company. However, our client has made it clear that it is forbidden to attack the services aggressively using exploits, as these services are in production.

Additionally, our teammates have found the following credentials "ceil:qwer1234", and they pointed out that some of the company's employees were talking about SSH keys on a forum.

The administrators have stored a flag.txt file on this server to track our progress and measure success. Fully enumerate the target and submit the contents of this file as proof.
```

---
### `resolution :`

## Initial Reconnaissance

### Nmap Scan

The first thing I did was to run an nmap scan over the server IP.
```bash
sudo nmap -sV 10.129.11.228 
```

```bash
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-11-21 09:37 CST
Nmap scan report for 10.129.11.228
Host is up (0.046s latency).
Not shown: 996 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
21/tcp   open  ftp
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.2 (Ubuntu Linux; protocol 2.0)
53/tcp   open  domain  ISC BIND 9.16.1 (Ubuntu Linux)
2121/tcp open  ftp
2 services unrecognized despite returning data. If you know the service/version, please submit the following fingerprints at https://nmap.org/cgi-bin/submit.cgi?new-service :
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
SF-Port21-TCP:V=7.94SVN%I=7%D=11/21%Time=6920875C%P=x86_64-pc-linux-gnu%r(
SF:NULL,40,"220\x20ProFTPD\x20Server\x20\(ftp\.int\.inlanefreight\.htb\)\x
SF:20\[10\.129\.11\.228\]\r\n")%r(GenericLines,9C,"220\x20ProFTPD\x20Serve
SF:r\x20\(ftp\.int\.inlanefreight\.htb\)\x20\[10\.129\.11\.228\]\r\n500\x2
SF:0Invalid\x20command:\x20try\x20being\x20more\x20creative\r\n500\x20Inva
SF:lid\x20command:\x20try\x20being\x20more\x20creative\r\n");
==============NEXT SERVICE FINGERPRINT (SUBMIT INDIVIDUALLY)==============
SF-Port2121-TCP:V=7.94SVN%I=7%D=11/21%Time=6920875C%P=x86_64-pc-linux-gnu%
SF:r(NULL,31,"220\x20ProFTPD\x20Server\x20\(Ceil's\x20FTP\)\x20\[10\.129\.
SF:11\.228\]\r\n")%r(GenericLines,8D,"220\x20ProFTPD\x20Server\x20\(Ceil's
SF:\x20FTP\)\x20\[10\.129\.11\.228\]\r\n500\x20Invalid\x20command:\x20try\
SF:x20being\x20more\x20creative\r\n500\x20Invalid\x20command:\x20try\x20be
SF:ing\x20more\x20creative\r\n");
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 30.89 seconds
```

### Port Analysis

Here we can see many interesting pieces of information:

```bash
21/tcp   open  ftp
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.2 (Ubuntu Linux; protocol 2.0)
53/tcp   open  domain  ISC BIND 9.16.1 (Ubuntu Linux) # <- DNS
2121/tcp open  ftp
...
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel # <- system information
```

---

## Service Enumeration

### SSH Enumeration


The subject told us that our teammate has found credentials linked to SSH, so we confirmed that the DNS server has an open SSH port.

So, I tried those credentials on SSH:
```bash
ssh -v ceil@10.129.11.228 -o PreferredAuthentications=password
```
```bash
OpenSSH_9.2p1 Debian-2+deb12u7, OpenSSL 3.0.17 1 Jul 2025
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: /etc/ssh/ssh_config line 19: include /etc/ssh/ssh_config.d/*.conf matched no files
debug1: /etc/ssh/ssh_config line 21: Applying options for *
debug1: Connecting to 10.129.11.228 [10.129.11.228] port 22.
debug1: Connection established.
...
debug1: Authentications that can continue: publickey
debug1: No more authentication methods to try.
ceil@10.129.11.228: Permission denied (publickey).
```
Unfortunately, SSH is configured to only allow connection with public key for the ceil user.

### FTP Enumeration

My next goal was to inspect the FTP server.


```bash
ftp 10.129.11.228 21 # <- port 
```
I tried to use credential mentioned in the subject and i've got granted access.
```
Connected to 10.129.11.228.
220 ProFTPD Server (ftp.int.inlanefreight.htb) [10.129.11.228]
Name (10.129.11.228:root): ceil
331 Password required for ceil
Password: qwer1234 
230 User ceil logged in
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> 
```
but nothing was on this FTP service.
```
ftp> ls -la
229 Entering Extended Passive Mode (|||8846|)
150 Opening ASCII mode data connection for file list
drwxr-xr-x   2 root     root         4096 Nov 10  2021 .
drwxr-xr-x   2 root     root         4096 Nov 10  2021 ..
226 Transfer complete
ftp> exit
221 Goodbye.
```

---

## Exploitation

### FTP Access

I retried on the 2121 FTP service 
```bash
ftp 10.129.11.228 2121 # <- port 
```
output :
```
Connected to 10.129.11.228.
220 ProFTPD Server (Ceil's FTP) [10.129.11.228]
Name (10.129.11.228:root): ceil
331 Password required for ceil
Password: qwer1234 
230 User ceil logged in
Remote system type is UNIX.
Using binary mode to transfer files.
ftp>
```


```
ftp> ls -la
229 Entering Extended Passive Mode (|||38469|)
150 Opening ASCII mode data connection for file list
drwxr-xr-x   4 ceil     ceil         4096 Nov 10  2021 .
drwxr-xr-x   4 ceil     ceil         4096 Nov 10  2021 ..
-rw-------   1 ceil     ceil          294 Nov 10  2021 .bash_history
-rw-r--r--   1 ceil     ceil          220 Nov 10  2021 .bash_logout
-rw-r--r--   1 ceil     ceil         3771 Nov 10  2021 .bashrc
drwx------   2 ceil     ceil         4096 Nov 10  2021 .cache
-rw-r--r--   1 ceil     ceil          807 Nov 10  2021 .profile
drwx------   2 ceil     ceil         4096 Nov 10  2021 .ssh
-rw-------   1 ceil     ceil          759 Nov 10  2021 .viminfo
226 Transfer complete
ftp>
```

This time we have good information.

`.bash_history`: can reveal some secrets
`.ssh`: contains the private key of the user

### SSH Key Extraction

So, I hopped into the .ssh directory to retry the connection with the private key
```
ftp> cd .ssh
250 CWD command successful
ftp> ls -la
229 Entering Extended Passive Mode (|||3968|)
150 Opening ASCII mode data connection for file list
drwx------   2 ceil     ceil         4096 Nov 10  2021 .
drwxr-xr-x   4 ceil     ceil         4096 Nov 10  2021 ..
-rw-rw-r--   1 ceil     ceil          738 Nov 10  2021 authorized_keys
-rw-------   1 ceil     ceil         3381 Nov 10  2021 id_rsa
-rw-r--r--   1 ceil     ceil          738 Nov 10  2021 id_rsa.pub
226 Transfer complete
```

and I used `get` to transfer the file to my VM.
```
ftp> get id_rsa 
local: id_rsa remote: id_rsa
229 Entering Extended Passive Mode (|||2996|)
150 Opening BINARY mode data connection for id_rsa (3381 bytes)
100% |*************************************************************************************************************************************************|  3381      787.44 KiB/s    00:00 ETA
226 Transfer complete
ftp> exit
221 Goodbye.
```

### SSH Connection

>`-i` permits to specify the private key path 
```bash
ssh -i ./id_rsa -v ceil@10.129.11.228
```

```
OpenSSH_9.2p1 Debian-2+deb12u7, OpenSSL 3.0.17 1 Jul 2025
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: /etc/ssh/ssh_config line 19: include /etc/ssh/ssh_config.d/*.conf matched no files
debug1: /etc/ssh/ssh_config line 21: Applying options for *
debug1: Connecting to 10.129.11.228 [10.129.11.228] port 22.
debug1: Connection established.
...
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for './id_rsa' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "./id_rsa": bad permissions
debug1: No more authentication methods to try.
ceil@10.129.11.228: Permission denied (publickey).
```

This line tells us the problem:
>Permissions 0644 for './id_rsa' are too open.

We want only the read and write permissions for the user:
```bash
chmod 600 id_rsa # read 4 + write 2
```
So I retried with the new permission for the key.
```bash
ssh -i ./id_rsa -v ceil@10.129.11.228
```
```bash
Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-90-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Fri 21 Nov 2025 04:29:36 PM UTC

  System load:  0.08              Processes:               177
  Usage of /:   86.3% of 3.87GB   Users logged in:         0
  Memory usage: 14%               IPv4 address for ens192: 10.129.11.228
  Swap usage:   0%

  => / is using 86.3% of 3.87GB

 * Super-optimized for small spaces - read how we shrank the memory
   footprint of MicroK8s to make it the smallest full K8s around.

   https://ubuntu.com/blog/microk8s-memory-optimisation

116 updates can be installed immediately.
1 of these updates is a security update.
To see these additional updates run: apt list --upgradable


The list of available updates is more than a week old.
To check for new updates run: sudo apt update

Last login: Wed Nov 10 05:48:02 2021 from 10.10.14.20
ceil@NIXEASY:~$ 
```
and it worked! 

```
ceil@NIXEASY:~$ ls -la
total 36
drwxr-xr-x 4 ceil ceil 4096 Nov 10  2021 .
drwxr-xr-x 5 root root 4096 Nov 10  2021 ..
-rw------- 1 ceil ceil  294 Nov 10  2021 .bash_history
-rw-r--r-- 1 ceil ceil  220 Nov 10  2021 .bash_logout
-rw-r--r-- 1 ceil ceil 3771 Nov 10  2021 .bashrc
drwx------ 2 ceil ceil 4096 Nov 10  2021 .cache
-rw-r--r-- 1 ceil ceil  807 Nov 10  2021 .profile
drwx------ 2 ceil ceil 4096 Nov 10  2021 .ssh
-rw------- 1 ceil ceil  759 Nov 10  2021 .viminfo
```

---

## Flag Capture

Looking for the flag path, I tried to look at the bash history.

```
ceil@NIXEASY:~$ cat .bash_history 
ls -al
mkdir ssh
cd ssh/
echo "test" > id_rsa
id
ssh-keygen -t rsa -b 4096
cd ..
rm -rf ssh/
ls -al
cd .ssh/
cat id_rsa
ls a-l
ls -al
cat id_rsa.pub >> authorized_keys
cd ..
cd /home
cd ceil/
ls -l
ls -al
mkdir flag
cd flag/
touch flag.txt
vim flag.txt 
cat flag.txt 
ls -al
mv flag/flag.txt .
```
There I saw that the flag was in the `/home` directory

```bash
ceil@NIXEASY:/home$ ls
ceil  cry0l1t3  flag
```

and showed it! 

```bash
ceil@NIXEASY:/home$ cat flag/flag.txt
HTB{7nrzise7hednrxihskjed7nzrgkweunj47zngrhdbkjhgdfbjkc7hgj}
```

![Success](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Labs/HTB_A_FOOTPRINTING_LAB/part-1/success.png)

---