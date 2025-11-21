# MSSQL CONFIGURATION

## ❌ Dangerous Settings

- MSSQL clients not using encryption to connect to the MSSQL server

- The use of self-signed certificates when encryption is being used. It is possible to spoof self-signed certificates

- The use of [named pipes](https://learn.microsoft.com/en-us/sql/tools/configuration-manager/named-pipes-properties?view=sql-server-ver15)

- Weak & default sa credentials. Admins may forget to disable this account