#!/bin/bash

# Define installation directory
INSTALL_DIR=$HOME/opt/graphicsmagick

# Create the directory if it doesn't exist
mkdir -p $INSTALL_DIR

# Download and extract GraphicsMagick
curl -L https://sourceforge.net/projects/graphicsmagick/files/graphicsmagick/1.3.36/GraphicsMagick-1.3.36.tar.gz/download -o graphicsmagick.tar.gz
tar -xvzf graphicsmagick.tar.gz
cd GraphicsMagick-1.3.36

# Configure and install GraphicsMagick into the specified directory
./configure --prefix=$INSTALL_DIR
make
make install

# Clean up
cd ..
rm -rf GraphicsMagick-1.3.36 graphicsmagick.tar.gz