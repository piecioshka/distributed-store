'use strict';

let cookie = require('cookie_js');

module.exports = {
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
        return this.create.apply(this, arguments);
    },

    delete(key) {
        return new Promise((resolve) => {
            cookie.remove(key);
            resolve();
        });
    }
};
