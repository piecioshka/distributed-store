'use strict';

let cookie = require('cookie_js');

let api = {
    create(key, value) {
        return new Promise((resolve) => {
            cookie.set(key, value);
            resolve();
        });
    },

    read(key) {
        return new Promise((resolve) => {
            let status = cookie.get(key);
            resolve(status);
        });
    },

    update(name, value) {
        return api.create.apply(api, arguments);
    },

    delete(key) {
        return new Promise((resolve) => {
            cookie.remove(key);
            let isDeleted = cookie.get(key) === undefined;
            resolve(isDeleted);
        });
    }
};

module.exports = api;
