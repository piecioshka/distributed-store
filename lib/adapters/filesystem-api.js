'use strict';

// 5MB
let size = 5 * 1024 * 1024;
let fileSystem = null;

let requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

let setupTemporaryStorage = (resolve, reject) => {
    requestFileSystem(window.TEMPORARY, size, (fs) => {
        fileSystem = fs;
        resolve(fs);
    }, (error) => {
        console.error('Setup temporary storage ends with error: ' + error.name);
        reject(error);
    });
};

let setupPersistentStorage = (resolve, reject) => {
    requestFileSystem(window.PERSISTENT, size, (fs) => {
        fileSystem = fs;
        resolve(fs);
    }, (error) => {
        console.error('Setup persistent storage ends with error: ' + error.name);
        reject(error);
    });
};

let setup = () => {
    return new Promise((resolve, reject) => {
        // Jeśli zasób już istnieje, to nic nie róbmy.
        if (fileSystem) {
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
                return new Promise((resolve, reject) => {
                    fileSystem.root.getFile(key, { create: true }, (fileEntry) => {
                        fileEntry.createWriter((fileWriter) => {
                            fileWriter.onwriteend = () => {
                                resolve({});
                            };

                            fileWriter.onerror = (error) => {
                                reject(error);
                            };

                            var blob = new Blob([value], { type: 'text/plain' });

                            fileWriter.write(blob);
                        }, (error) => {
                            console.error('Method create was failed: ' + error.name);
                            reject(error);
                        });
                    }, (error) => {
                        console.error('Method create was failed: ' + error.name);
                        reject(error);
                    });
                });
            });
    },

    read(key) {
        return Promise.resolve()
            .then(setup)
            .then(() => {
                return new Promise((resolve) => {
                    fileSystem.root.getFile(key, {}, (fileEntry) => {
                        fileEntry.file(function (file) {
                            var reader = new FileReader();

                            reader.onloadend = function () {
                                resolve({ value: this.result });
                            };

                            reader.readAsText(file);
                        }, (error) => {
                            console.error('Method read was failed: ' + error.name);
                            resolve({ value: undefined });
                        });

                    }, (error) => {
                        console.error('Method read was failed: ' + error.name);
                        resolve({ value: undefined });
                    });
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
                return new Promise((resolve) => {
                    fileSystem.root.getFile(key, {}, (fileEntry) => {
                        fileEntry.remove(function () {
                            resolve({});
                        }, (error) => {
                            console.error('Method delete was failed: ' + error.name);
                            resolve({});
                        });

                    }, (error) => {
                        console.error('Method delete was failed: ' + error.name);
                        resolve({});
                    });
                });
            });
    }
};

module.exports = api;
