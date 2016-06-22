'use strict';

let createDatabase = () => {
    return openDatabase('cohestore', '1.0', 'Store private data', 5 * 1014 * 1024);
};

let db = createDatabase();

let api = {
    create(name, value) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
                tx.executeSql('INSERT INTO foo (id, text) VALUES (?,?)', [1, "synergies"], (results) => {
                    console.log('success');
                    console.log(results);
                    resolve();
                }, () => {
                    console.log('error');
                    reject();
                });
            });
        });
    },

    read(name) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM foo', [], (tx, results) => {
                    console.log('success');
                    console.log(results);
                    resolve();
                }, () => {
                    console.error('error');
                    reject();
                });
            });
        });
    },

    update(name, value) {
        return api.create.apply(api, arguments);
    },

    delete(name) {
        return new Promise((resolve, reject) => {
            db.transaction(function (tx) {
                tx.executeSql("DELETE FROM todo WHERE ID=?", [1], () => {
                    console.log('success');
                    resolve();
                }, () => {
                    console.error('error');
                    reject();
                });
            });
        });
    }
};

module.exports = api;