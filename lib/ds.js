'use strict';

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

let adaptersList = Object.keys(adapters).map((name) => adapters[name]);

module.exports = {
    create: (...args) => {
        adaptersList.forEach((adapter) => {
            adapter.create.apply(adapter, ...args);
        });
    },

    read: (...args) => {
        adaptersList.forEach((adapter) => {
            adapter.create.apply(adapter, ...args);
        });
    },

    update: (...args) => {
        adaptersList.forEach((adapter) => {
            adapter.create.apply(adapter, ...args);
        });
    },

    delete: (...args) => {
        adaptersList.forEach((adapter) => {
            adapter.create.apply(adapter, ...args);
        });
    }
};

// Na potrzeby testów jednostkowych.
module.exports._adapters = adapters;
