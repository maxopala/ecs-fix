#!/bin/bash

DIST_DIR="dist"

if [ ! -d "$DIST_DIR" ]
then
  echo "Creating directory $DIST_DIR..."
  mkdir -p "$DIST_DIR"
fi

echo "Creating project zip..."
zip -q -r -FS "${DIST_DIR}/ecs-fix.zip" * --exclude '.*' --exclude dist
echo "Zip file created!"
