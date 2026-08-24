#!/bin/bash
echo "Starting local web server for Heizung Mantsch..."
if which xdg-open > /dev/null; then
  xdg-open http://localhost:8090/ &
elif which open > /dev/null; then
  open http://localhost:8090/ &
fi
python3 -m http.server 8090
