'use strict';

let debug = {
    log: require('debug')('DistributedStore:WebStorageAdapter:log'),
    info: require('debug')('DistributedStore:WebStorageAdapter:info'),
    warn: require('debug')('DistributedStore:WebStorageAdapter:warn'),
    error: require('debug')('DistributedStore:WebStorageAdapter:error')
};

// WebStorage Adapter

let api = {
    create(key, value) {
        return new Promise((resolve) => {
            localStorage.setItem(key, value);

            let status = (localStorage.getItem(key) === value);
            debug.log('create');
            resolve({ success: status });
        });
    },

    read(key) {
        return new Promise((resolve) => {
            let value = localStorage.getItem(key);

            if (value === null) {
                value = undefined;
            }

            debug.log('read');
            resolve({ value: value });
        });
    },

    update(key, value) {
        return api.create.apply(api, arguments);
    },

    delete(key) {
        return new Promise((resolve) => {
            localStorage.removeItem(key);

            let status = (localStorage.getItem(key) === null);
            debug.log('delete');
            resolve({ success: status });
        });
    }
};

module.exports = api;
