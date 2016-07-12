'use strict';

let debug = {
    log: require('debug')('DistributedStore:IndexedDBAdapter:log'),
    info: require('debug')('DistributedStore:IndexedDBAdapter:info'),
    warn: require('debug')('DistributedStore:IndexedDBAdapter:warn'),
    error: require('debug')('DistributedStore:IndexedDBAdapter:error')
};

const DATABASE_NAME = 'ds-db';
const STORE_NAME = 'ds-store';
const KEY_PATH = 'name';

let displayDatabases = () => {
    debug.info('IndexedDB Databases:');
    let request = window.indexedDB.webkitGetDatabaseNames();
    request.onsuccess = () => {
        let dbs = Array.from(request.result);
        dbs.forEach((dataBaseName, index) => {
            debug.info('%d. %s', index + 1, dataBaseName);
        });
    };
};

// displayDatabases();

let openDatabase = () => {
    return new Promise((resolve, reject) => {
        let open = window.indexedDB.open(DATABASE_NAME, 1);

        open.onsuccess = () => {
            let db = open.result;
            resolve(db);
        };

        open.onerror = (...args) => {
            debug.error('error', ...args);
            reject();
        };

        open.onblocked = (...args) => {
            debug.error('blocked', ...args);
            reject();
        };

        open.onupgradeneeded = () => {
            let db = open.result;
            let store = db.createObjectStore(STORE_NAME, { keyPath: KEY_PATH });
            store.createIndex('NameIndex', ['name']);
        };
    });
};

// IndexedDB Adapter

let api = {
    create(key, value) {
        return new Promise((resolve) => {
            Promise.resolve()
                .then(openDatabase)
                .then((db) => {
                    let tx = db.transaction(STORE_NAME, 'readwrite');
                    tx.oncomplete = () => db.close();
                    let store = tx.objectStore(STORE_NAME);
                    store.put({ name: key, value: value });
                    debug.log('create');
                    resolve({ success: true });
                });
        });
    },

    read(key) {
        return new Promise((resolve) => {
            Promise.resolve()
                .then(openDatabase)
                .then((db) => {
                    let tx = db.transaction(STORE_NAME, 'readwrite');
                    tx.oncomplete = () => db.close();
                    let store = tx.objectStore(STORE_NAME);
                    let index = store.index('NameIndex');
                    let fetchName = index.get([key]);

                    fetchName.onsuccess = () => {
                        let value = undefined;

                        if (fetchName.result) {
                            value = fetchName.result.value;
                        }

                        debug.log('read');
                        resolve({ value: value });
                    };

                    fetchName.onerror = (error) => {
                        debug.error('Method read was failed: ' + error.name);
                        resolve({
                            value: undefined,
                            error: error
                        });
                    };
                });
        });
    },

    update(key, value) {
        return api.create.apply(api, arguments);
    },

    delete(key) {
        return new Promise((resolve) => {
            Promise.resolve()
                .then(openDatabase)
                .then((db) => {
                    let tx = db.transaction(STORE_NAME, 'readwrite');
                    tx.oncomplete = () => db.close();
                    let store = tx.objectStore(STORE_NAME);
                    store.delete(key);
                    debug.log('delete');
                    resolve({ success: true });
                });
        });
    }
};

module.exports = api;
