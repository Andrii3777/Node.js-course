## Remote User Creation Script

This script automates the process of creating a new user on a remote server, enabling remote login via SSH key and granting sudo privileges. It ensures compatibility with both root and sudo-enabled users.

## Usage
```bash
./ssh-create-remote-user.sh <root_user> <server_ip> <new_user> '<ssh_key>'

```

- <root_user>: The existing user with root access on the server.
- <server_ip>: The IP address of the remote server.
- <new_user>: The name of the user to be created.
- <ssh_key>: The SSH public key for the new user enclosed in single quotes.

## Example
```bash
./ssh-create-remote-user.sh root 192.168.1.1 newuser 'ssh-rsa AAAAB3N....public_key_here'

```

Ensure that the script works seamlessly with both root and sudo-enabled users.

Note
- **The script can be executed multiple times without causing duplicate entries in sudoers.

## Requirements
- **SSH access to the remote server.
- **Proper SSH key generation for secure remote access.

## Important
- **Use this script responsibly, and ensure that SSH access is properly secured.
- **Always keep backups of important data before making significant changes.

Disclaimer: Use at your own risk. The author is not responsible for any unintended consequences.
