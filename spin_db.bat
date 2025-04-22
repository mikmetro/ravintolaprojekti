@echo off
echo Starting MariaDB in background.

docker run --rm --name mariadb-temp ^
  -e MARIADB_ROOT_PASSWORD=ilikedocker ^
  -e MARIADB_DATABASE=ilikedocker ^
  -e MARIADB_USER=ilikedocker ^
  -e MARIADB_PASSWORD=ilikedocker ^
  -p 3306:3306 ^
  mariadb:latest
pause