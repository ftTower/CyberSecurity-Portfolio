# Rsync

![Banner](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Protocols/Rsync/banner.png)

---

## 📋 Protocol Information

| Property | Details |
|----------|---------|
| **Type** | File Synchronization Protocol |
| **Port** | TCP 873 (rsync daemon), TCP 22 (over SSH) |
| **OS** | UNIX, Linux (Native), Windows (via Cygwin/WSL) |
| **Purpose** | Efficiently synchronizes files and directories between two locations by transferring only differences |
| **Sub-Protocols** | N/A |
| **Status** | Active/Standard |
| **OSI Layer** | Application Layer (Layer 7) |
| **RFC** | N/A (Open Source Protocol) |

---

## 🔨 Usage

Syncing a directory recursively and keeping file permissions:
```Bash
rsync -a ~/<src_path>/ <src_new_name>@<ip_address>:~<dst_path>
```

---

## 📕 Cross-References

1. [Footprinting Rsync](../Rsync/footprinting.md)

---

## 🔗 External-Ressources

- [HackTheBox Module](https://academy.hackthebox.com/module/112/section/1240)
- [Rsync man page](https://linux.die.net/man/1/rsync)
- [Use Rsync over SSH](https://phoenixnap.com/kb/how-to-rsync-over-ssh)
