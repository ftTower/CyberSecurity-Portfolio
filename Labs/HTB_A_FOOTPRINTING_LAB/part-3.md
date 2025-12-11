# Third part

### `subject :`
```
The third server is an MX and management server for the internal network. Subsequently, this server has the function of a backup server for the internal accounts in the domain. Accordingly, a user named HTB was also created here, whose credentials we need to access.
```

### `resolution :`

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

| Port | Details | Course link |
| ---  | ------- | ------|---|
| 22  | Secure Shell | [SSH](../../Courses/Protocols/SSH/readme.md) | |
| 110  | POP3 | [POP3]() | |
| 143 | Imap | [IMAP](../../Courses/Protocols/IMAP/readme.md) | |
| 993 | ssl/imap | [SSL IMAP]() | |
| 995 | ssl/pop3 | [SSL POP3]() | |

>ssl-cert: Subject: commonName=NIXHARD

### SSH Enum

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

---

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


