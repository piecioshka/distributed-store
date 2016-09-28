'use strict';

let debug = {
    log: require('debug')('DistributedStore:WebStorageAdapter:log'),
    info: require('debug')('DistributedStore:WebStorageAdapter:info'),
    warn: require('debug')('DistributedStore:WebStorageAdapter:warn'),
    error: require('debug')('DistributedStore:WebStorageAdapter:error')
};

let localStorage = window.localStorage;

// WebStorage Adapter

function create(key, value) {
    return new Promise((resolve) => {
        localStorage.setItem(key, value);

        let status = (localStorage.getItem(key) === value);
        debug.log('create');
        resolve({ success: status });
    });
}


function read(key) {
    return new Promise((resolve) => {
        let value = localStorage.getItem(key);

        if (value === null) {
            value = undefined;
        }

        debug.log('read');
        resolve({ value: value });
    });
}

function update(key, value) {
    return create(key, value);
}

function remove(key) {
    return new Promise((resolve) => {
        localStorage.removeItem(key);

        let status = (localStorage.getItem(key) === null);
        debug.log('remove');
        resolve({ success: status });
    });
}

module.exports = {
    create,
    read,
    update,
    remove
};
