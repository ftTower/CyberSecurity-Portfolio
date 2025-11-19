# SSH (Secure Shell) Configuration


---

## 📃 Default Configuration

```bash
cat /etc/ssh/sshd_config  | grep -v "#" | sed -r '/^\s*$/d'
```
```
Include /etc/ssh/sshd_config.d/*.conf
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding yes # <- THIS IS A UNSECURE PARAMETER
PrintMotd no
AcceptEnv LANG LC_*
Subsystem       sftp    /usr/lib/openssh/sftp-server
```

## ❌ Dangerous Settings

| Setting | Parameter |Description | 
|---------|-----------|------------|
| **PasswordAuthentication** | yes | Allows password-based authentication. |
| **PermitEmptyPasswords** | yes | Allows the use of empty passwords. |
| **PermitRootLogin** | yes | Allows to log in as the root user. |
| **Protocol** | 1 | Uses an outdated version of encryption. |
| **X11Forwarding** | yes | Allows X11 forwarding for GUI applications. |
| **AllowTcpForwarding** | yes | Allows forwarding of TCP ports. |
| **PermitTunnel** | | Allows tunneling. |
| **DebianBanner** | yes | Displays a specific banner when logging in. |


---