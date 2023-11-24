#!/usr/bin/bash

# Check the number of arguments
if [ "$#" -ne 4 ]; then
    echo "Usage: $0 <ROOT_USER> <SERVER_IP> <NEW_USER> <PUBLIC_KEY>"
    exit 1
fi

# Assign the passed arguments to global variables
ROOT_USER=$1
SERVER_IP=$2
NEW_USER=$3
PUBLIC_KEY=$4

# Display the values of the variables
echo "ROOT_USER: $ROOT_USER"
echo "SERVER_IP: $SERVER_IP"
echo "NEW_USER: $NEW_USER"
echo "PUBLIC_KEY: $PUBLIC_KEY"

# SSH into the server
echo "Connecting to the server..."
ssh -i ../.ssh/key-pair-ubuntu-nodejs.pem $ROOT_USER@$SERVER_IP <<EOF
    # Check if the user already exists
    if id "$NEW_USER" &>/dev/null; then
        echo "User $NEW_USER already exists."
    else
        # Add the new user and set an empty password
        echo "Adding a new user..."
        sudo useradd -m -s /bin/bash $NEW_USER
        sudo passwd -d $NEW_USER

        # Add sudo rights to user if not already in sudo group
        if ! id -nG "$NEW_USER" | grep -qw "sudo"; then
            echo "Granting sudo rights to the new user..."
            sudo usermod -aG sudo $NEW_USER
        else
            echo "User $NEW_USER is already in the sudo group."
        fi
    fi

    # Switch to the new user
    su - $NEW_USER <<INNER_EOF
        # Create necessary directories and set permissions
        echo "Setting up user directories and permissions..."
        mkdir -p ~/.ssh
        chmod 700 ~/.ssh

        # Create authorized_keys file and set permissions
        touch ~/.ssh/authorized_keys
        chmod 600 ~/.ssh/authorized_keys

        # Add the public key to authorized_keys if not already added
        if ! grep -qF "$PUBLIC_KEY" ~/.ssh/authorized_keys; then
            echo "Adding the public key to authorized_keys..."
            echo "$PUBLIC_KEY" >> ~/.ssh/authorized_keys
        else
            echo "Public key is already in authorized_keys."
        fi
INNER_EOF
EOF

# SSH into the server using the new user and provided key
echo "Connecting to the server with the new user..."
ssh -i ../.ssh/my_key $NEW_USER@$SERVER_IP

# Print a success message
echo "Script execution completed successfully."
