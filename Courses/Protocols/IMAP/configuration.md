# IMAP Configuration and Setup


---

## 📃 Default Configuration

>Both IMAP and POP3 have a large number of configuration options, making it difficult to deep dive into each component in more detail. If you wish to examine these protocol configurations deeper, we recommend creating a VM locally and install the two packages dovecot-imapd, and dovecot-pop3d using apt and play around with the configurations and experiment.
[core settings](https://doc.dovecot.org/2.4.1/core/summaries/settings.html)
[service configuration](https://doc.dovecot.org/2.4.1/core/config/service.html)


## ❌ Dangerous Settings

| Setting | Description | 
|---------|------------|
| auth_debug | Enables all authentication debug logging. |
| auth_debug_passwords | This setting adjusts log verbosity, the submitted passwords, and the scheme gets logged. |
| auth_verbose | Logs unsuccessful authentication attempts and their reasons. |
| auth_verbose_passwords | Passwords used for authentication are logged and can also be truncated. |
| auth_anonymous_username | This specifies the username to be used when logging in with the ANONYMOUS SASL mechanism. |

---