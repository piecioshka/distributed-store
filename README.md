# distributed-store

> :hammer: Trwała spójność w zapisanych danych po stronie użytkownika.

## Publiczne API

### `create(key: string, value: string)`

Tworzy parę `key=value`.
Zwraca informację o tym, czy udało się zapisać.

### `read(key: string)`

Pobiera wartość spod klucza `key`.

### `update(key: string, value: string)`

Aktualizuje wartość spod klucza `key`.
Zwraca informację o tym, czy udało się zaktualizować dane.

### `delete(key: string)`

Usuwa wartość i klucz `key`.
Zwraca informację o tym, czy udało się usunąć dane.

## Zasada działania

1. [x] Mamy 4 metody na najwyższym poziomie: CREATE, READ, UPDATE, DELETE.
2. [x] Podczas zapisywania (op. CREATE, UPDATE) zapisujemy wszędzie tam, gdzie jest to możliwe.
3. [ ] Podczas odczytywania (op. READ), pobieramy wszystkie wartości ze wszystkich storage-ów.
Jeśli jeden lub więcej (ale nie więcej niż połowa) storage-ów jest pusta,
to bierzemy je pod uwagę podczas pobierania i wpisujemy w puste storage-e
i aktualizujemy zmienione wartości.
4. [ ] Podczas kasowania (op. DELETE) usuwamy wartości i klucze ze wszystkich storage-ów.

## Adaptery

Chcemy uzyskać możliwie jak najbardziej trwałe zapisanie danych po stronie użytkownika przeglądarki.

Wykorzystujemy do tego celu:

* [x] Cookies
* [x] Filesystem API
    * http://www.html5rocks.com/en/tutorials/file/filesystem/
    * https://www.w3.org/TR/2012/WD-quota-api-20120703/
    * Open in Chrome browser: `filesystem:http://localhost/persistent/`
* [x] IndexedDB
    * https://www.w3.org/TR/2011/WD-IndexedDB-20111206/
* [x] Web SQL Database
    * https://www.w3.org/TR/webdatabase/
    * https://www.w3.org/TR/2010/NOTE-webdatabase-20101118/
* [x] WebStorage (localStorage)
    * https://www.w3.org/TR/2009/WD-webstorage-20090910/
