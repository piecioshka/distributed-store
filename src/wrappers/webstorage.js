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
            let status = localStorage.getItem(key);

            if (status === null) {
                status = undefined;
            }

            resolve(status);
        });
    },

    update(name, value) {
        return api.create.apply(api, arguments);
    },

    delete(key) {
        return new Promise((resolve) => {
            localStorage.removeItem(key);
            api.read(key)
                .then((status) => {
                    return status === undefined;
                })
                .then(resolve);
        });
    }
};

module.exports = api;
