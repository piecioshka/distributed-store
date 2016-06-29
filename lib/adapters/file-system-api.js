'use strict';

// 5MB
let size = 5 * 1024 * 1024;
let fileSystem = null;

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

let setup = () => {
    return new Promise((resolve, reject) => {
        // Jeśli zasób już istnieje, to nic nie róbmy.
        if (fileSystem) {
            console.log('short...');
            resolve(fileSystem);
            return;
        }

        window.requestFileSystem(window.TEMPORARY, size, (fs) => {
            console.log('long...', fs);
            fileSystem = fs;
            resolve(fs);
        }, (error) => {
            reject(error);
        });
    });
};

let api = {
    create(key, value) {
        return Promise.resolve()
            .then(setup)
            .then(() => {
                fileSystem.root.getFile(key, {}, function (fileEntry) {

                });
            });
    },

    read(key) {
        return Promise.resolve()
            .then(setup)
            .then(() => {
                fileSystem.root.getFile(key, {}, function (fileEntry) {

                });
            });
    },

    update(key, value) {
        return api.create.apply(api, arguments);
    },

    delete(key) {
        return Promise.resolve()
            .then()
        setup();
    }
};

module.exports = api;
