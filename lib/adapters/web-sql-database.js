'use strict';

const DATABASE_NAME = 'ds';
const VERSION = '0.1';
const TABLE_NAME = 'ds';
const MAX_SIZE = 65536;

let createDatabase = () => {
    return openDatabase(DATABASE_NAME, VERSION, TABLE_NAME, MAX_SIZE);
};

let db = createDatabase();

let printQuery = (sql, data) => {
    let args = [sql];

    if (data) {
        args.push(data);
    }

    console.info(...args);
};

let query = (tx, sql, data) => {
    sql = sql.trim().replace(/\n/g, ' ').replace(/    /g, '');

    printQuery(sql, data);

    tx.executeSql(sql, data, (results) => {
        // Nie robimy nic więcej.
    }, (error) => {
        console.error('error', error);
    });
};

let api = {
    create(name, value) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                const CREATE_TABLE_SQL = `
                    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                    name TEXT NOT NULL PRIMARY KEY,
                    value TEXT NOT NULL
                    )`;

                query(tx, CREATE_TABLE_SQL);
            });

            db.transaction((tx) => {
                const INSERT_SQL = `
                    INSERT INTO ${TABLE_NAME} (name, value) 
                    VALUES (?,?)
                    `;

                const INSERT_DATA = [name, value];

                query(tx, INSERT_SQL, INSERT_DATA);
            });

            resolve();
        });
    },

    read(name) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                const SELECT_SQL = `
                    SELECT * 
                    FROM ${TABLE_NAME} 
                    WHERE name=?
                    `;
                const SELECT_DATA = [name];

                tx.executeSql(SELECT_SQL, SELECT_DATA, (tx, results) => {
                    let value;

                    if (results.rows.length !== 0) {
                        if (results.rows.length > 1) {
                            throw new Error('Is more than single value saved in database');
                        }

                        let row = results.rows.item(0);

                        if (row) {
                            value = row.value;
                        }
                    }

                    resolve({ value: value });
                }, (error) => {
                    console.error('error', error);
                    resolve({ value: undefined });
                });
            });
        });
    },

    update(name, value) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                const UPDATE_ROW_SQL = `
                    UPDATE ${TABLE_NAME}
                    SET value=?
                    WHERE name=?
                    `;
                const UPDATE_ROW_DATA = [value, name];

                query(tx, UPDATE_ROW_SQL, UPDATE_ROW_DATA);
                resolve();
            });
        });
    },

    delete(name) {
        return new Promise((resolve) => {
            db.transaction(function (tx) {
                const DELETE_ROW_SQL = `
                    DELETE FROM ${TABLE_NAME}
                    WHERE name=?
                    `;
                const DELETE_ROW_DATA = [name];

                query(tx, DELETE_ROW_SQL, DELETE_ROW_DATA);

                resolve();
            });
        });
    }
};

module.exports = api;