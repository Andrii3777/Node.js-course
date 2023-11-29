#!/usr/bin/bash

# Specify the path to the target directory
DIRECTORY_PATH="/home/andriiubuntu/www2"

# Change to the target directory
cd "$DIRECTORY_PATH" || exit

# Find and archive only non-archive files created more than 3 minutes ago
/usr/bin/find . -type f -cmin +1 -exec sh -c '
  for file do
    # Extract the file name without the path
    file_name=$(basename "$file")

    # Extract the file name without the extension
    base_name="${file_name%.*}"

    # Check if the file is already an archive
    if [ "${file_name##*.}" != "zip" ]; then
      # Create a zip archive
      /usr/bin/zip -j "$base_name.zip" "$file"

      # Remove the original file
      rm "$file"
    fi
  done
' sh {} +

# Display a message upon successful completion
echo "Archiving completed."
