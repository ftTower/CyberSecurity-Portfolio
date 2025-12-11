
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
**Objective:** Access mail server and retrieve HTB user credentials  
**Key Techniques:**
- Nmap scan identifying SSH (22), POP3 (110), IMAP (143), and secure mail services (993/995)
- SSH enumeration and analysis
- IMAP/POP3 protocol exploitation
- Mail server credential discovery and authentication
- Email enumeration to locate sensitive information

**Skills Demonstrated:** Mail protocol enumeration (POP3/IMAP), SSH analysis, email-based intelligence gathering

