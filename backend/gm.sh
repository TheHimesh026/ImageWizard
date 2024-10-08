#!/bin/bash

# Enable debugging
set -x

# Define installation directory
INSTALL_DIR=$HOME/opt/graphicsmagick

# Create the directory if it doesn't exist
echo "Creating installation directory..."
mkdir -p $INSTALL_DIR || { echo "Failed to create directory"; exit 1; }

# Download and extract GraphicsMagick
echo "Downloading GraphicsMagick..."
curl -L https://sourceforge.net/projects/graphicsmagick/files/graphicsmagick/1.3.36/GraphicsMagick-1.3.36.tar.gz/download -o graphicsmagick.tar.gz || { echo "Failed to download GraphicsMagick"; exit 1; }

echo "Extracting GraphicsMagick..."
tar -xvzf graphicsmagick.tar.gz || { echo "Failed to extract GraphicsMagick"; exit 1; }
cd GraphicsMagick-1.3.36 || { echo "Directory not found"; exit 1; }

# Configure and install GraphicsMagick
echo "Configuring GraphicsMagick..."
./configure --prefix=$INSTALL_DIR || { echo "Configuration failed"; exit 1; }

echo "Building GraphicsMagick..."
make || { echo "Make command failed"; exit 1; }

echo "Installing GraphicsMagick..."
make install || { echo "Install command failed"; exit 1; }

# Clean up
echo "Cleaning up..."
cd .. || { echo "Failed to return to the previous directory"; exit 1; }
rm -rf GraphicsMagick-1.3.36 graphicsmagick.tar.gz || { echo "Failed to remove temporary files"; exit 1; }

echo "Installation completed successfully!"