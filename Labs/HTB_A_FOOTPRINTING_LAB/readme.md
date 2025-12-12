
<h1 align="center">Footprinting Lab</h1>
<p align="center">
  <img src="https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Labs/HTB_A_FOOTPRINTING_LAB/banner.png" alt="Banner">
</p>

---
<h1 align="center">Table of Contents</h1>

## [First Part](./part-1.md)
**Target:** DNS Server (10.129.11.228)  
**Objective:** Enumerate the internal DNS server and retrieve the flag.txt file  
**Key Techniques:**
- Nmap reconnaissance identifying FTP (21, 2121), SSH (22), and DNS (53) services
- FTP enumeration discovering two ProFTPD servers
- Credential usage (`ceil:qwer1234`) to access FTP on port 2121
- Retrieved SSH private key (`id_rsa`) from user's `.ssh` directory via FTP
- Fixed key permissions and established SSH connection
- Located flag in `/home/flag/flag.txt` through bash history analysis

**Skills Demonstrated:** Service enumeration, FTP exploitation, SSH key-based authentication, file permission management

---

## [Second Part](./part-2.md)
**Target:** Internal Network Server (10.129.202.41)  
**Objective:** Enumerate SMB/NFS/RDP services and obtain HTB user credentials  
**Key Techniques:**
- Comprehensive nmap scan revealing RPC (111), SMB (139/445), NFS (2049), and RDP (3389)
- enum4linux-ng for SMB enumeration (identified SMB signing disabled - NTLM relay vulnerability)
- NFS share mounting (`/TechSupport`) revealing SMTP credentials (`alex:lol123!mD`)
- SMB access with discovered credentials exposing SQL Server credentials (`sa:87N1ns@slls83`)
- RDP connection to Windows host
- Microsoft SQL Server Management Studio access to extract HTB user data from `accounts` database

**Skills Demonstrated:** Multi-protocol enumeration, NFS exploitation, credential harvesting, Windows penetration, database access

---

## [Third Part](./part-3.md)
**Target:** MX and Backup Server (10.129.202.20)  
**Objective:** Access the mail server and retrieve HTB user credentials from the MySQL database  
**Key Techniques:**
- Nmap TCP scan identifying SSH (22), POP3 (110), IMAP (143), and secure mail services (993/995)
- SSH enumeration with ssh-audit tool revealing potential DHEat DoS vulnerability
- UDP scan discovering open SNMP (161) service
- SNMP enumeration using `snmpwalk` and `onesixtyone` for community string brute-force
- Discovery of custom community string `backup` (replacing default `public`)
- SNMP data extraction revealing user credentials (`tom:NMds732Js2761`)
- IMAP/IMAPS connection using `curl` and `openssl s_client` for mailbox enumeration
- Navigation through IMAP folders (Notes, Meetings, Important, INBOX)
- Extraction of SSH private key from email in INBOX mailbox
- SSH key permission configuration (chmod 600) and passphrase modification with `ssh-keygen`
- SSH authentication with private key to access Tom's system
- Bash history analysis revealing MySQL usage and key locations
- MySQL database enumeration and credential extraction
- Final retrieval of HTB user credentials from `users` database

**Skills Demonstrated:** SNMP enumeration and exploitation, IMAP protocol manipulation, email intelligence gathering, SSH key management, MySQL database access, credential extraction from multiple sources

