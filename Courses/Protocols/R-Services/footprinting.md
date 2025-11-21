# Rsync Footprinting


## Methods


### Scanning for R-Services

```bash
sudo nmap -sV -p 512,513,514 <ip_address>
```
```bash
Starting Nmap 7.80 ( https://nmap.org ) at 2022-12-02 15:02 EST
Nmap scan report for 10.0.17.2
Host is up (0.11s latency).

PORT    STATE SERVICE    VERSION
512/tcp open  exec?
513/tcp open  login?
514/tcp open  tcpwrapped

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 145.54 seconds
```

---

### Sample .rhosts File


```bash
cat .rhosts
```

```bash
student         10.0.17.5
+               10.0.17.10
+               +
```

The + symbols serve as wildcards; they authorize a host (10.0.17.10) to use r-services with the htb-student account.

|username | ip address | details |
|---------|------------|---------|
| +       | 10.0.17.10 | connection possible with any username |
| +       | +          | connection possible with any username and host |

---

### Logging in Using Rlogin

```bash
rlogin 10.0.17.2 -l student
```
```bash
Last login: Fri Dec  2 16:11:21 from localhost

[student@localhost ~]$
```
> note that with + symbol in username part you don't have to specify the right username

---

### Listing Authenticated Users Using Rwho

This can serve to enumerate hosts for further attacks.

```bash
rwho
```
```bash
root        web01:pts/0     Dec  2 21:34
student     workstn01:tty1  Dec  2 19:57  2:25  # <-inactivity time
```
>The rwho daemon periodically broadcasts information about logged-on users, so it might be beneficial to watch the network traffic.

### Listing Authenticated Users Using Rusers

```bash
rusers -al <ip address>
```
```bash
student     10.0.17.5:console          Dec 2 19:57     2:25
```
>The client machine sends an RPC request to the rusersd daemon on each target machine.



