#!/bin/bash

# Define the source and target directories
source_directory="./src/lib/labouvroir/equipe/profile-img"
target_directory="./static/team"

# Check if source directory exists
if [ ! -d "$source_directory" ]; then
  echo "Source directory does not exist."
  exit 1
fi

# Check if target directory exists
if [ ! -d "$target_directory" ]; then
  echo "Target directory does not exist. Creating it now."
  mkdir -p "$target_directory"
fi

# Copy all files
cp "$source_directory"/* "$target_directory"

echo "Files copied successfully!"
