## Remote User Creation Script
This script is designed to automate the process of changing file permissions to 660 and directory permissions to 770 within a specified folder

## Usage

1. **Modify the Script:**
    Open the script `change_permissions.sh` file and update the `target_folder` variable with the path to the directory where you want to perform the file archiving.

2. **Make the Script Executable:**
    ```bash
    chmod +x change_permissions.sh
    ```

3. **Run the Script in a Screen Session:**
    ```bash
    screen -S change_permissions_screen -dm ./change_permissions.sh
    ```

3. **Check Script Execution:**
    ```bash
    screen -r change_permissions_screen
    ```

    After changing the permissions according to this script, if all goes well, the output of:
    ```bash
        ls -l
    ```
    for the file and folder in the specified directory will look like this:

    For files (rights 660):
    ```bash
        -rw-rw----
    ```

    For folders (rights 770):
    ```bash
        drwxrwx---
    ```

## Permissions Configuration
The script, by default, changes file permissions to 660 and directory permissions to 770. You can customize these values within the script if needed.

## Disclaimer
Use this script responsibly and ensure that changing permissions is appropriate for the files and directories in the specified folder. Always have backups of critical data before making significant changes.