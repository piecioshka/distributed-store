'use strict';

let debug = {
    log: require('debug')('DistributedStore:CookiesAdapter:log'),
    info: require('debug')('DistributedStore:CookiesAdapter:info'),
    warn: require('debug')('DistributedStore:CookiesAdapter:warn'),
    error: require('debug')('DistributedStore:CookiesAdapter:error')
};

let cookie = require('cookie_js');

// Cookies Adapter API

let api = {
    create(key, value) {
        return new Promise((resolve) => {
            cookie.set(key, value);

            let status = (cookie.get(key) === value);
            debug.log('create');
            resolve({ success: status });
        });
    },

    read(key) {
        return new Promise((resolve) => {
            let value = cookie.get(key);
            debug.log('read');
            resolve({ value: value });
        });
    },

    update(key, value) {
        return api.create.apply(api, arguments);
    },

    delete(key) {
        return new Promise((resolve) => {
            cookie.remove(key);

            let status = (cookie.get(key) === undefined);
            debug.log('delete');
            resolve({ success: status});
        });
    }
};

module.exports = api;
