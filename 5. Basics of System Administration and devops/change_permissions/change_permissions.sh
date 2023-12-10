#!/usr/bin/bash

# Specify the path to the target folder
target_folder="/path/to/your/target/folder"

while true; do
    # Loop to change permissions for files
    find "$target_folder" -type f -exec chmod 660 {} \;
    echo "Permissions changed for files in $target_folder"

    # Loop to change permissions for directories
    find "$target_folder" -type d -exec chmod 770 {} \;
    echo "Permissions changed for directories in $target_folder"

    # Pause for 5 seconds
    sleep 5
done