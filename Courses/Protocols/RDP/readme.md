# RDP (Remote Desktop Protocol)

![Banner](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Protocols/RDP/banner.png)

---

## 📋 Protocol Information

| Property | Details |
|----------|---------|
| **Type** | Application Protocol |
| **Port** | 3389 (TCP/UDP) |
| **OS** | Windows (primarily), Linux, macOS |
| **Purpose** | Remote desktop access and control |
| **Sub-Protocols** | TLS, CredSSP, NLA |
| **Status** | Active |
| **OSI Layer** | Layer 7 (Application) |
| **RFC** | [RFC 8446](https://www.rfc-editor.org/rfc/rfc908.html)|

---

## 🔨 Usage


```bash
xfreerdp /u:<username> /p:"<password>" /v:<ip_address>
```
Authentication and connection to RDP servers can be made in several ways. For example, we can connect to RDP servers on Linux using xfreerdp, rdesktop, or Remmina and interact with the GUI of the server accordingly.

## 📕 Cross-References

1. [footprinting](../RDP/footprinting.md)

---

## 🔗 External-Ressources

- [Microsoft doc](https://learn.microsoft.com/en-us/troubleshoot/windows-server/remote/understanding-remote-desktop-protocol)
