# OTP

## Cybersecurity Piscine - ft_otp

**Nothing ever lasts forever...**
![header](https://github.com/ftTower/ftTower/blob/main/assets/OTP/header.png)


## Table of Contents

- [OTP](#otp)
	- [Cybersecurity Piscine - ft\_otp](#cybersecurity-piscine---ft_otp)
	- [Table of Contents](#table-of-contents)
	- [Implementation Details](#implementation-details)
		- [Overview](#overview)
		- [Features](#features)
		- [Usage](#usage)
		- [Example](#example)
		- [Error Handling](#error-handling)
		- [Dependencies](#dependencies)
		- [Notes](#notes)

---
## Implementation Details

### Overview
The provided Python script implements a **TOTP (Time-based One-Time Password)** generator with encryption and decryption capabilities. It supports two main functionalities:
1. Encrypting a 64-character hexadecimal key and securely storing it in a file.
2. Generating a TOTP using the stored key.

### Features
- **Hexadecimal Key Validation**: Ensures the provided key is a valid 64-character hexadecimal string.
- **Encryption**: Uses the `cryptography` library to encrypt the key securely.
- **Decryption**: Validates the encryption key and decrypts the stored file.
- **TOTP Generation**: Implements the HOTP algorithm as per [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226) and generates time-based OTPs.

### Usage
The script accepts the following arguments:
- `-g <key.hex>`: Encrypts the provided hexadecimal key and stores it in `ft_otp.key`.
![encryption](https://github.com/ftTower/ftTower/blob/main/assets/OTP/encryption.png)

- `-k <encrypted_file>`: Decrypts the stored key and generates TOTPs.
![get otp](https://github.com/ftTower/ftTower/blob/main/assets/OTP/otp.png)
![new otp](https://github.com/ftTower/ftTower/blob/main/assets/OTP/new_otp.png)

### Example
```bash
# Encrypt a hexadecimal key
python3 otp-generator.py -g key.hex
#Encrypting your 64 hexa password in key.hex

# Generate TOTPs using the encrypted key
python3 otp-generator.py -k ft_otp.key
#Decrypting your 64 hexa password in ft_otp.key

```

### Error Handling
- Invalid hexadecimal keys raise a `ValueError`.
- Invalid encryption keys result in decryption failure with an appropriate error message.
- The script handles user interruptions gracefully.

### Dependencies
- `cryptography`: For encryption and decryption.
- `scanf`: For user input parsing.
- Standard Python libraries: `sys`, `hmac`, `base64`, `struct`, `hashlib`, `time`.

### Notes
- The script ensures that the generated OTPs are 6 digits long.
- The encryption key is generated dynamically and must be stored securely by the user.
- The TOTP remains valid for 30 seconds, as per the standard.

```bash
oathtool --totp $(cat key.hex | tr -d ' \t\n\r')
```