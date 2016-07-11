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
            let value = cookie.get(key);
            resolve({
                value: value
            });
        });
    },

    update(key, value) {
        return api.create.apply(api, arguments);
    },

    delete(key) {
        return new Promise((resolve) => {
            cookie.remove(key);
            resolve();
        });
    }
};

module.exports = api;
