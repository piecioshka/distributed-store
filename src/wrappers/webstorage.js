'use strict';

module.exports = {
    create(key, value) {
        return new Promise((resolve) => {
            let status = localStorage.setItem(key, value);
            resolve(status);
        });
    },

    read(key) {
        return new Promise((resolve) => {
            let status = localStorage.getItem(key);
            resolve(status);
        });
    },

    update(name, value) {
        return this.create.apply(this, arguments);
    },

    delete(key) {
        return new Promise((resolve) => {
            let status = localStorage.removeItem(key);
            resolve(status);
        });
    }
};
