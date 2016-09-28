let CookiesAdapter = require('./adapters/cookies');
let FilesystemAPIAdapter = require('./adapters/filesystem-api');
let IndexedDBAdapter = require('./adapters/indexeddb');
let WebSQLDatabaseAdapter = require('./adapters/web-sql-database');
let WebStorageAdapter = require('./adapters/webstorage');

let adapters = {
    Cookies: CookiesAdapter,
    FilesystemAPI: FilesystemAPIAdapter,
    IndexedDB: IndexedDBAdapter,
    WebSQLDatabase: WebSQLDatabaseAdapter,
    WebStorage: WebStorageAdapter
};

// Tablica adapterów.
let adaptersList = Object.keys(adapters).map((key) => adapters[key]);

module.exports = {
    create: (...args) => {
        let creators = adaptersList.map((adapter) => {
            return adapter.create(...args);
        });

        return Promise.all(creators);
    },

    read: (...args) => {
        let readers = adaptersList.map((adapter) => {
            return adapter.read(...args);
        });

        return Promise.all(readers)
            .then((results) => {
                console.log(results);
                return results;
            });
    },

    update: (...args) => {
        let creators = adaptersList.map((adapter) => {
            return adapter.update(...args);
        });

        return Promise.all(creators);
    },

    remove: (...args) => {
        let creators = adaptersList.map((adapter) => {
            return adapter.remove(...args);
        });

        return Promise.all(creators);
    }
};

// Na potrzeby testów jednostkowych.
module.exports._adapters = adapters;
