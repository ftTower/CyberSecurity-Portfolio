# Footprinting Lab

<p align="center">
  <img src="https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Labs/HTB_A_FOOTPRINTING_LAB/banner.png" alt="Banner">
</p>

---
## Table of Contents

### 1. [First Part](#first-part)
  - [Subject](#subject)
  - [Resolution](#resolution)
    - [Enumeration](#enumeration)
    - [SSH Footprinting](#ssh-footprinting)
    - [FTP Footprinting](#ftp-footprinting)
    - [Retrieving Informations](#retriving-informations)
### 2. [Second Part](#second-part)

### 3. [Third Part](#third-part)


---
## First part

### `subject :`
```
We were commissioned by the company Inlanefreight Ltd to test three different servers in their internal network. The company uses many different services, and the IT security department felt that a penetration test was necessary to gain insight into their overall security posture.

The first server is an internal DNS server that needs to be investigated. In particular, our client wants to know what information we can get out of these services and how this information could be used against its infrastructure. Our goal is to gather as much information as possible about the server and find ways to use that information against the company. However, our client has made it clear that it is forbidden to attack the services aggressively using exploits, as these services are in production.

Additionally, our teammates have found the following credentials "ceil:qwer1234", and they pointed out that some of the company's employees were talking about SSH keys on a forum.

The administrators have stored a flag.txt file on this server to track our progress and measure success. Fully enumerate the target and submit the contents of this file as proof.
```
---
### `resolution :`

#### `enumeration: `

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

Here we can see many interesting pieces of information:

```bash
21/tcp   open  ftp
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.2 (Ubuntu Linux; protocol 2.0)
53/tcp   open  domain  ISC BIND 9.16.1 (Ubuntu Linux) # <- DNS
2121/tcp open  ftp
...
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel # <- system information
```

#### `SSH Footprinting: `

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

My next goal was to inspect the ftp server.

#### `FTP Footprinting: `


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

#### `Retriving informations: `


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

![Success](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Labs/HTB_A_FOOTPRINTING_LAB/success.png)

---

## Second part

### `subject :`
```
This second server is a server that everyone on the internal network has access to. In our discussion with our client, we pointed out that these servers are often one of the main targets for attackers and that this server should be added to the scope.

Our customer agreed to this and added this server to our scope. Here, too, the goal remains the same. We need to find out as much information as possible about this server and find ways to use it against the server itself. For the proof and protection of customer data, a user named HTB has been created. Accordingly, we need to obtain the credentials of this user as proof.
```

### `Hint: `
>In SQL Management Studio, we can edit the last 200 entries of the selected database and read the entries accordingly. We also need to keep in mind, that each Windows system has an Administrator account.

### `resolution :`


```bash
sudo nmap -A 10.129.206.69
```
>`-A`: Enable OS detection, version detection, script scanning, and traceroute

```
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-12-10 13:28 CST
Stats: 0:00:45 elapsed; 0 hosts completed (1 up), 1 undergoing SYN Stealth Scan
SYN Stealth Scan Timing: About 99.99% done; ETC: 13:29 (0:00:00 remaining)
Stats: 0:00:46 elapsed; 0 hosts completed (1 up), 1 undergoing SYN Stealth Scan
SYN Stealth Scan Timing: About 99.99% done; ETC: 13:29 (0:00:00 remaining)
Nmap scan report for 10.129.206.69
Host is up (0.11s latency).
Not shown: 994 closed tcp ports (reset)
PORT     STATE SERVICE       VERSION
111/tcp  open  rpcbind?
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds?
2049/tcp open  mountd        1-3 (RPC #100005)
3389/tcp open  ms-wbt-server Microsoft Terminal Services
| rdp-ntlm-info: 
|   Target_Name: WINMEDIUM
|   NetBIOS_Domain_Name: WINMEDIUM
|   NetBIOS_Computer_Name: WINMEDIUM
|   DNS_Domain_Name: WINMEDIUM
|   DNS_Computer_Name: WINMEDIUM
|   Product_Version: 10.0.17763
|_  System_Time: 2025-12-10T19:31:46+00:00
| ssl-cert: Subject: commonName=WINMEDIUM
| Not valid before: 2025-12-09T19:26:09
|_Not valid after:  2026-06-10T19:26:09
|_ssl-date: 2025-12-10T19:31:54+00:00; -24s from scanner time.
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.94SVN%E=4%D=12/10%OT=111%CT=1%CU=42575%PV=Y%DS=2%DC=T%G=Y%TM=69
OS:39CAD0%P=x86_64-pc-linux-gnu)SEQ(SP=106%GCD=1%ISR=109%TI=I%CI=I%II=I%SS=
OS:S%TS=U)SEQ(SP=106%GCD=1%ISR=109%TI=RD%CI=I%II=I%TS=U)OPS(O1=M552NW8NNS%O
OS:2=M552NW8NNS%O3=M552NW8%O4=M552NW8NNS%O5=M552NW8NNS%O6=M552NNS)WIN(W1=FF
OS:FF%W2=FFFF%W3=FFFF%W4=FFFF%W5=FFFF%W6=FF70)ECN(R=Y%DF=Y%T=80%W=FFFF%O=M5
OS:52NW8NNS%CC=Y%Q=)T1(R=Y%DF=Y%T=80%S=O%A=S+%F=AS%RD=0%Q=)T2(R=N)T3(R=N)T4
OS:(R=Y%DF=Y%T=80%W=0%S=A%A=O%F=R%O=%RD=0%Q=)T5(R=Y%DF=Y%T=80%W=0%S=Z%A=S+%
OS:F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=80%W=0%S=A%A=O%F=R%O=%RD=0%Q=)T7(R=N)U1(R=
OS:Y%DF=N%T=80%IPL=164%UN=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%
OS:T=80%CD=Z)

Network Distance: 2 hops
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2025-12-10T19:31:45
|_  start_date: N/A
|_clock-skew: mean: -24s, deviation: 0s, median: -24s

TRACEROUTE (using port 199/tcp)
HOP RTT       ADDRESS
1   183.48 ms 10.10.14.1
2   183.74 ms 10.129.206.69

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 233.95 seconds
```

I was a bit lost with this output, but i made a little research about open ports on this machine and wrote thoses courses to continue. 

| Port | Details | Course link | Notes |
| ---  | ------- | ------|---|
| 111  | Remote Procedure Call | [RPC]() | used for NFS
| 139 - 445  | Server Message Block | [SMB](../../Courses/Protocols/SMB/readme.md) | 
| 2049 | Network File System | [NFS](../../Courses/Protocols/NFS/readme.md) |
| 3389 | Remote Desktop Protocol | [RDP](../../Courses/Protocols/RDP/readme.md) |

#### `SMB enumeration: `

For SMB i decided to use `enum4linux-ng` a tool for enumerating information from Windows and Samba systems

```bash
git clone https://github.com/cddmp/enum4linux-ng.git && cd enum4linux-ng && pip3 install -r requirements.txt
```

```bash
./enum4linux-ng.py 10.129.206.69 -A
```

#### `enum4linux-ng output :`
```bash
ENUM4LINUX - next generation (v1.3.7)

 ==========================
|    Target Information    |
 ==========================
[*] Target ........... 10.129.206.69
[*] Username ......... ''
[*] Random Username .. 'mygkyuhh'
[*] Password ......... ''
[*] Timeout .......... 5 second(s)

 ======================================
|    Listener Scan on 10.129.206.69    |
 ======================================
[*] Checking LDAP
[-] Could not connect to LDAP on 389/tcp: connection refused
[*] Checking LDAPS
[-] Could not connect to LDAPS on 636/tcp: connection refused
[*] Checking SMB
[+] SMB is accessible on 445/tcp
[*] Checking SMB over NetBIOS
[+] SMB over NetBIOS is accessible on 139/tcp

 ============================================================
|    NetBIOS Names and Workgroup/Domain for 10.129.206.69    |
 ============================================================
[-] Could not get NetBIOS names information via 'nmblookup': timed out

 ==========================================
|    SMB Dialect Check on 10.129.206.69    |
 ==========================================
[*] Trying on 445/tcp
[+] Supported dialects and settings:
Supported dialects:
  SMB 1.0: false
  SMB 2.0.2: true
  SMB 2.1: true
  SMB 3.0: true
  SMB 3.1.1: true
Preferred dialect: SMB 3.0
SMB1 only: false
SMB signing required: false

 ============================================================
|    Domain Information via SMB session for 10.129.206.69    |
 ============================================================
[*] Enumerating via unauthenticated SMB session on 445/tcp
[+] Found domain information via SMB
NetBIOS computer name: WINMEDIUM
NetBIOS domain name: ''
DNS domain: WINMEDIUM
FQDN: WINMEDIUM
Derived membership: workgroup member
Derived domain: unknown

 ==========================================
|    RPC Session Check on 10.129.206.69    |
 ==========================================
[*] Check for anonymous access (null session)
[-] Could not establish null session: STATUS_ACCESS_DENIED
[*] Check for guest access
[-] Could not establish guest session: STATUS_LOGON_FAILURE
[-] Sessions failed, neither null nor user sessions were possible

 ================================================
|    OS Information via RPC for 10.129.206.69    |
 ================================================
[*] Enumerating via unauthenticated SMB session on 445/tcp
[+] Found OS information via SMB
[*] Enumerating via 'srvinfo'
[-] Skipping 'srvinfo' run, not possible with provided credentials
[+] After merging OS information we have the following result:
OS: Windows 10, Windows Server 2019, Windows Server 2016
OS version: '10.0'
OS release: '1809'
OS build: '17763'
Native OS: not supported
Native LAN manager: not supported
Platform id: null
Server type: null
Server type string: null

[!] Aborting remainder of tests since sessions failed, rerun with valid credentials

Completed after 7.12 seconds
```

observation from this output :

`1. SMB is confirmed active `
```
[*] Checking SMB
[+] SMB is accessible on 445/tcp
[*] Checking SMB over NetBIOS
[+] SMB over NetBIOS is accessible on 139/tcp
```

`2. SMB Preferred dialect is 3.0 `
```
[+] Supported dialects and settings:
Supported dialects:
  SMB 1.0: false
  SMB 2.0.2: true
  SMB 2.1: true
  SMB 3.0: true
  SMB 3.1.1: true
Preferred dialect: SMB 3.0
```
> We can see that SMB 1.0 is disabled, this version was targeted by the EternalBlue exploit (Launched the WannaCry Ransomware back in the days)

`3. SMB signing is not required`
```
SMB signing required: false
```
> This is a misconfiguration. It opens the way for a NTLM relaying (Man in the Middle Attack) because SMB won't verify packets integrity. 


`4. Cannot connect with no credentials`
```
[*] Check for anonymous access (null session)
[-] Could not establish null session: STATUS_ACCESS_DENIED
[*] Check for guest access
[-] Could not establish guest session: STATUS_LOGON_FAILURE
[-] Sessions failed, neither null nor user sessions were possible
```

`5. SMB server data`
```
NetBIOS computer name: WINMEDIUM
NetBIOS domain name: ''
DNS domain: WINMEDIUM
FQDN: WINMEDIUM
Derived membership: workgroup member
Derived domain: unknown
---
OS: Windows 10, Windows Server 2019, Windows Server 2016
OS version: '10.0'
OS release: '1809'
OS build: '17763'
Native OS: not supported
Native LAN manager: not supported
Platform id: null
Server type: null
Server type string: null
```

#### `NFS enumeration: `


