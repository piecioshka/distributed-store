'use strict';

let cookie = require('cookie_js').cookie;

module.exports = {
    create(key, value) {
        return new Promise((resolve) => {
            let status = cookie.set(key, value);
            resolve(status);
        });
    },

    read(key) {
        return new Promise((resolve) => {
            let status = cookie.get(key);
            resolve(status);
        })
    },

    update(name, value) {
        return this.create.apply(this, arguments);
    },

    delete(key) {
        return new Promise((resolve) => {
            let status = cookie.remove(key);
            resolve(status);
        })
    }
};
