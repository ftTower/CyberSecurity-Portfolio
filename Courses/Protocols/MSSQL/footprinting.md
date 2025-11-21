# MSSQL Footprinting

## Methods

### Connecting with `Mssql client`

if you already have the credentials, you can connect with Mssql client.

```bash
python3 mssqlclient.py <username>@<ip_address> -windows-auth
```

```
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

Password:
[*] Encryption required, switching to TLS
[*] ENVCHANGE(DATABASE): Old Value: master, New Value: master
[*] ENVCHANGE(LANGUAGE): Old Value: , New Value: us_english
[*] ENVCHANGE(PACKETSIZE): Old Value: 4096, New Value: 16192
[*] INFO(SQL-01): Line 1: Changed database context to 'master'.
[*] INFO(SQL-01): Line 1: Changed language setting to us_english.
[*] ACK: Result: 1 - Microsoft SQL Server (150 7208) 
[!] Press help for extra shell commands

SQL> select name from sys.databases

name                                                                                                                               

--------------------------------------------------------------------------------------

master                                                                                                                             

tempdb                                                                                                                             

model                                                                                                                              

msdb                                                                                                                               

Transactions  
```

### Script scanning with `Nmap`

```bash
sudo nmap --script ms-sql-info,ms-sql-empty-password,ms-sql-xp-cmdshell,ms-sql-config,ms-sql-ntlm-info,ms-sql-tables,ms-sql-hasdbaccess,ms-sql-dac,ms-sql-dump-hashes --script-args mssql.instance-port=1433,mssql.username=sa,mssql.password=,mssql.instance-name=MSSQLSERVER -sV -p <ip_address>
```

```
Starting Nmap 7.91 ( https://nmap.org ) at 2021-11-08 09:40 EST
Nmap scan report for <ip_address>
Host is up (0.15s latency).

PORT     STATE SERVICE  VERSION
1433/tcp open  ms-sql-s Microsoft SQL Server 2019 15.00.2000.00; RTM
| ms-sql-ntlm-info: 
|   Target_Name: SQL-01
|   NetBIOS_Domain_Name: SQL-01
|   NetBIOS_Computer_Name: SQL-01
|   DNS_Domain_Name: SQL-01
|   DNS_Computer_Name: SQL-01
|_  Product_Version: 10.0.17763

Host script results:
| ms-sql-dac: 
|_  Instance: MSSQLSERVER; DAC port: 1434 (connection failed)
| ms-sql-info: 
|   Windows server name: SQL-01
|   <ip_address>\MSSQLSERVER: 
|     Instance name: MSSQLSERVER
|     Version: 
|       name: Microsoft SQL Server 2019 RTM
|       number: 15.00.2000.00
|       Product: Microsoft SQL Server 2019
|       Service pack level: RTM
|       Post-SP patches applied: false
|     TCP port: 1433
|     Named pipe: \\<ip_address>\pipe\sql\query
|_    Clustered: false

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.52 seconds
```

### Ping in `Metasploit`

```bash
msfconsole
```

```
msf6 auxiliary(scanner/mssql/mssql_ping) > set rhosts <ip_address>

rhosts => <ip_address>

msf6 auxiliary(scanner/mssql/mssql_ping) > run

[*] <ip_address>:       - SQL Server information for <ip_address>:
[+] <ip_address>:       -    ServerName      = SQL-01
[+] <ip_address>:       -    InstanceName    = MSSQLSERVER
[+] <ip_address>:       -    IsClustered     = No
[+] <ip_address>:       -    Version         = 15.0.2000.5
[+] <ip_address>:       -    tcp             = 1433
[+] <ip_address>:       -    np              = \\SQL-01\pipe\sql\query
[*] <ip_address>:       - Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed
```