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


