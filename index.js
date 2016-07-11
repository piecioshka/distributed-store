'use strict';

module.exports = {
    Cookies: require('./lib/adapters/cookies'),
    FilesystemAPI: require('./lib/adapters/filesystem-api'),
    IndexedDB: require('./lib/adapters/indexeddb'),
    WebSQLDatabase: require('./lib/adapters/web-sql-database'),
    WebStorage: require('./lib/adapters/webstorage')
};
