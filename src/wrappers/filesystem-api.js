'use strict';

let api = {
    create() {

    },

    read() {

    },

    update() {
        return api.create.apply(api, arguments);
    },

    delete() {

    }
};

module.exports = api;
