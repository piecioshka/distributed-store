# distributed-store

> :hammer: Trwała spójność w zapisanych danych po stronie użytkownika.

## Cel

Chcemy uzyskać jak najbardziej to możliwe trwałe zapisanie danych po stronie użytkownika przeglądarki.
Wykorzystujemy do tego celu:

* [x] Cookies
* [x] Filesystem API
    * http://www.html5rocks.com/en/tutorials/file/filesystem/
    * https://www.w3.org/TR/2012/WD-quota-api-20120703/
    * Open in Chrome browser: `filesystem:http://localhost/persistent/`
* [ ] IndexedDB - https://www.w3.org/TR/2011/WD-IndexedDB-20111206/
* [x] Web SQL Database
    * https://www.w3.org/TR/webdatabase/
    * https://www.w3.org/TR/2010/NOTE-webdatabase-20101118/
* [x] WebStorage (localStorage) - https://www.w3.org/TR/2009/WD-webstorage-20090910/

## API

Podstawowa realizacja CRUD

### `create(name, value)`
### `read(name)`
### `update(name, value)`
### `delete(name)`
