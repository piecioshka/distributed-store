'use strict';

// 5MB
let size = 5 * 1024 * 1024;
let fileSystem = null;

let requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

let getErrorMessage = (error) => {
    var msg = '';

    switch (error.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    }

    return msg;
};

let setupTemporaryStorage = (resolve, reject) => {
    requestFileSystem(window.TEMPORARY, size, (fs) => {
        console.log('temp long...', fs);
        fileSystem = fs;
        resolve(fs);
    }, (error) => {
        console.error('setup temp error: ' + getErrorMessage(error));
        reject(error);
    });
};

let setupPersistentStorage = (resolve, reject) => {
    requestFileSystem(window.PERSISTENT, size, (fs) => {
        console.log('pers long...', fs);
        fileSystem = fs;
        resolve(fs);
    }, (error) => {
        console.error('setup pers error: ' + getErrorMessage(error));
        reject(error);
    });
};

let setup = () => {
    return new Promise((resolve, reject) => {
        // Jeśli zasób już istnieje, to nic nie róbmy.
        if (fileSystem) {
            console.log('short...');
            resolve(fileSystem);
            return;
        }

        // setupTemporaryStorage(resolve, reject);
        setupPersistentStorage(resolve, reject);
    });
};

let api = {
    create(key, value) {
        return Promise.resolve()
            .then(setup)
            .then(() => {
                fileSystem.root.getFile(key, { create: true }, (fileEntry) => {
                    console.info(fileEntry);
                }, (error) => {
                    console.error('create error: ' + getErrorMessage(error));
                });
            });
    },

    read(key) {
        return Promise.resolve()
            .then(setup)
            .then(() => {
                fileSystem.root.getFile(key, {}, (fileEntry) => {
                    console.warn(fileEntry);
                }, (error) => {
                    console.error('read error: ' + getErrorMessage(error));
                });
            });
    },

    update(key, value) {
        return api.create.apply(api, arguments);
    },

    delete(key) {
        return Promise.resolve()
            .then(setup)
            .then(() => {
                fileSystem.root.getFile(key, {}, (fileEntry) => {
                    console.warn(fileEntry);
                }, (error) => {
                    console.error('delete error: ' + getErrorMessage(error));
                });
            });
    }
};

module.exports = api;
