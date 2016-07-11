'use strict';

const DATABASE_NAME = 'ds-db';
const STORE_NAME = 'ds-store';
const KEY_PATH = 'name';

let displayDatabases = () => {
    console.info('IndexedDB Databases:');
    let request = window.indexedDB.webkitGetDatabaseNames();
    request.onsuccess = () => {
        let dbs = Array.from(request.result);
        dbs.forEach((dataBaseName, index) => {
            console.info('%d. %s', index + 1, dataBaseName);
        });
    };
};

// displayDatabases();

let openDatabase = () => {
    return new Promise((resolve, reject) => {
        let open = window.indexedDB.open(DATABASE_NAME, 1);

        open.onsuccess = (...args) => {
            let db = open.result;
            resolve(db);
        };

        open.onerror = (...args) => {
            console.error('error', ...args);
            reject();
        };

        open.onblocked = (...args) => {
            console.error('blocked', ...args);
            reject();
        };

        open.onupgradeneeded = (...args) => {
            let db = open.result;
            // db.deleteObjectStore(STORE_NAME);
            let store = db.createObjectStore(STORE_NAME, { keyPath: KEY_PATH });
            store.createIndex('NameIndex', ['name']);
        };
    });
};

let api = {
    create(name, value) {
        return new Promise((resolve) => {
            Promise.resolve()
                .then(openDatabase)
                .then((db) => {
                    let tx = db.transaction(STORE_NAME, 'readwrite');
                    tx.oncomplete = () => db.close();
                    let store = tx.objectStore(STORE_NAME);
                    store.put({ name: name, value: value });
                    resolve();
                });
        });
    },

    read(name) {
        return new Promise((resolve, reject) => {
            Promise.resolve()
                .then(openDatabase)
                .then((db) => {
                    let tx = db.transaction(STORE_NAME, 'readwrite');
                    tx.oncomplete = () => db.close();
                    let store = tx.objectStore(STORE_NAME);
                    let index = store.index('NameIndex');
                    let fetchName = index.get([name]);

                    fetchName.onsuccess = () => {
                        let value = undefined;

                        if (fetchName.result) {
                            value = fetchName.result.value;
                        }

                        resolve({ value: value });
                    };

                    fetchName.onerror = (error) => {
                        reject({ value: undefined });
                    };
                });
        });
    },

    update(name, value) {
        return api.create.apply(api, arguments);
    },

    delete(name) {
        return new Promise((resolve) => {
            Promise.resolve()
                .then(openDatabase)
                .then((db) => {
                    let tx = db.transaction(STORE_NAME, 'readwrite');
                    tx.oncomplete = () => db.close();
                    let store = tx.objectStore(STORE_NAME);
                    store.delete(name);
                    resolve();
                });
        });
    }
};

module.exports = api;
