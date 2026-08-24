@echo off
echo Starting local web server for Heizung Mantsch...
start "" http://localhost:8090/
python -m http.server 8090
