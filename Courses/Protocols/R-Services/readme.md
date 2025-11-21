# R-Services

![Banner](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Protocols/R-Services/banner.png)

---

## 📋 Protocol Information

| Property | Details |
|----------|---------|
| **Type** | Remote Execution Protocol Suite |
| **Port** | TCP 512 (rexec), TCP 513 (rlogin), TCP 514 (rsh) |
| **OS** | UNIX, Linux |
| **Purpose** | Remote login, remote shell execution, and remote command execution |
| **Sub-Protocols** | rlogin, rsh, rexec |
| **Status** | ❌ Deprecated (insecure, replaced by SSH) |
| **OSI Layer** | Application Layer (Layer 7) |
| **RFC** | [RFC 1282](https://www.rfc-editor.org/rfc/rfc1282)  |

---

## 🔨 Usage

| Command | Service Daemon | Port | Transport Protocol | Description |
|---------|----------------|------|-------------------|-------------|
| **rcp** | rshd | 514 | TCP | Copy a file or directory bidirectionally from the local system to the remote system (or vice versa) or from one remote system to another. It works like the cp command on Linux but provides no warning to the user for overwriting existing files on a system. |
| **rsh** | rshd | 514 | TCP | Opens a shell on a remote machine without a login procedure. Relies upon the trusted entries in the /etc/hosts.equiv and .rhosts files for validation. |
| **rexec** | rexecd | 512 | TCP | Enables a user to run shell commands on a remote machine. Requires authentication through the use of a username and password through an unencrypted network socket. Authentication is overridden by the trusted entries in the /etc/hosts.equiv and .rhosts files. |
| **rlogin** | rlogind | 513 | TCP | Enables a user to log in to a remote host over the network. It works similarly to telnet but can only connect to Unix-like hosts. Authentication is overridden by the trusted entries in the /etc/hosts.equiv and .rhosts files. |
---
The /etc/hosts.equiv file contains a list of trusted hosts and is used to grant access to other systems on the network. When users on one of these hosts attempt to access the system, they are automatically granted access without further authentication.


## 📕 Cross-References

1. [Footprinting](../R-Services/footprinting.md)

---

## 🔗 External-Ressources

- [Wiki page](https://en.wikipedia.org/wiki/Berkeley_r-commands)
