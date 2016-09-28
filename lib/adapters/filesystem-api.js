'use strict';

let debug = {
    log: require('debug')('DistributedStore:FilesystemAPIAdapter:log'),
    info: require('debug')('DistributedStore:FilesystemAPIAdapter:info'),
    warn: require('debug')('DistributedStore:FilesystemAPIAdapter:warn'),
    error: require('debug')('DistributedStore:FilesystemAPIAdapter:error')
};

// 5MB
let size = 5 * 1024 * 1024;
let fileSystem = null;

let requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

function setupTemporaryStorage(resolve, reject) {
    requestFileSystem(window.TEMPORARY, size, (fs) => {
        fileSystem = fs;
        resolve(fs);
    }, (error) => {
        debug.error('Setup temporary storage ends with error: ' + error.name);
        reject(error);
    });
}

function setupPersistentStorage(resolve, reject) {
    requestFileSystem(window.PERSISTENT, size, (fs) => {
        fileSystem = fs;
        resolve(fs);
    }, (error) => {
        debug.error('Setup persistent storage ends with error: ' + error.name);
        reject(error);
    });
}

function setup() {
    return new Promise((resolve, reject) => {
        // Jeśli zasób już istnieje, to nic nie róbmy.
        if (fileSystem) {
            resolve(fileSystem);
            return;
        }

        // setupTemporaryStorage(resolve, reject);
        setupPersistentStorage(resolve, reject);
    });
}

// Filesystem API Adapter

function create(key, value) {
    return Promise.resolve()
        .then(setup)
        .then(() => {
            return new Promise((resolve) => {
                fileSystem.root.getFile(key, { create: true }, (fileEntry) => {
                    fileEntry.createWriter((fileWriter) => {
                        fileWriter.onwriteend = () => {
                            debug.log('create');
                            resolve({ success: true });
                        };

                        fileWriter.onerror = (error) => {
                            debug.error('Method create was failed: ' + error.name);
                            resolve({
                                success: false,
                                error: error
                            });
                        };

                        var blob = new Blob([value], { type: 'text/plain' });

                        fileWriter.write(blob);
                    }, (error) => {
                        debug.error('Method create was failed: ' + error.name);
                        resolve({
                            success: false,
                            error: error
                        });
                    });
                }, (error) => {
                    debug.error('Method create was failed: ' + error.name);
                    resolve({
                        success: false,
                        error: error
                    });
                });
            });
        });
}

function read(key) {
    return Promise.resolve()
        .then(setup)
        .then(() => {
            return new Promise((resolve) => {
                fileSystem.root.getFile(key, {}, (fileEntry) => {
                    fileEntry.file(function (file) {
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            debug.log('read');
                            resolve({ value: this.result });
                        };

                        reader.readAsText(file);
                    }, (error) => {
                        debug.error('Method read was failed: ' + error.name);
                        resolve({
                            value: undefined,
                            error: error
                        });
                    });

                }, (error) => {
                    debug.error('Method read was failed: ' + error.name);
                    resolve({
                        value: undefined,
                        error: error
                    });
                });
            });
        });
}

function update(key, value) {
    return create(key, value);
}

function remove(key) {
    return Promise.resolve()
        .then(setup)
        .then(() => {
            return new Promise((resolve) => {
                fileSystem.root.getFile(key, {}, (fileEntry) => {
                    fileEntry.remove(function () {
                        debug.log('remove');
                        resolve({ success: true });
                    }, (error) => {
                        debug.error('Method remove was failed: ' + error.name);
                        resolve({
                            success: true,
                            error: error
                        });
                    });
                }, (error) => {
                    debug.error('Method remove was failed: ' + error.name);
                    resolve({
                        success: true,
                        error: error
                    });
                });
            });
        });
}

module.exports = {
    create,
    read,
    update,
    remove
};
