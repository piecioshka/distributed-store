'use strict';

let api = {
    create(key, value) {
        return new Promise((resolve) => {
            localStorage.setItem(key, value);
            resolve();
        });
    },

    read(key) {
        return new Promise((resolve) => {
            let value = localStorage.getItem(key);

            if (value === null) {
                value = undefined;
            }

            resolve({
                value: value
            });
        });
    },

    update(name, value) {
        return api.create.apply(api, arguments);
    },

    delete(key) {
        return new Promise((resolve) => {
            localStorage.removeItem(key);
            resolve();
        });
    }
};

module.exports = api;
