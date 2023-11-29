## File Archiver Script

This script is designed to archive files older than 3 minutes in a specified directory, creating a zip archive for each file and deleting the original file. The script is intended to be scheduled using cron and runs the archiving process every minute.

## Usage

1. **Modify the Script:**

    Open the `archive_script.sh` file and update the `DIRECTORY_PATH` variable with the path to the directory where you want to perform the file archiving.

3. **Make the Script Executable:**

    ```bash
    chmod +x archive_script.sh
    ```

4. **Schedule the Script with Cron:**

    Open the cron table for editing:

    ```bash
    crontab -e
    ```

    Add the following line to run the script every minute:

    ```bash
    * * * * * /path/to/your/repository/archive_script.sh
    ```

    Replace `/path/to/your/repository` with the actual path to your repository,
    for example `* * * * * /home/andriiubuntu/scripts/archive_script.sh`
