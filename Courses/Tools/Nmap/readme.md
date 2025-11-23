# Nmap

![Banner](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/Nmap/banner.png)

---

## 📋 Tool Information

| Property | Details |
|----------|---------|
| **Type** | Network Scanner |
| **Category** | Reconnaissance / Network Discovery |
| **Platform** | Linux, Windows, macOS |
| **Purpose** | Network exploration, port scanning, service detection, OS fingerprinting, and vulnerability assessment |
| **Documentation** | [Docs](https://nmap.org/book/man.html)  |

---

## 🔨 Usage

```bash
# Basic host discovery
nmap <target>

# Scan specific ports
nmap -p 80,443 <target>

# Scan port range
nmap -p 1-1000 <target>

# Service version detection
nmap -sV <target>

# OS detection
nmap -O <target>

# Aggressive scan
nmap -A <target>

# Stealth SYN scan
nmap -sS <target>

# UDP scan
nmap -sU <target>

# Save output to file
nmap -oN output.txt <target>
nmap -oX output.xml <target>

# Scan with NSE scripts
nmap --script vuln <target>
```


## 📕 Cross-References

1. []()

---

## 🔗 External-Ressources

- []()
