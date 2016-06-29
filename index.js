'use strict';

module.exports = {
    Cookies: require('./lib/adapters/cookies'),
    FileSystemAPI: require('./lib/adapters/file-system-api'),
    IndexedDB: require('./lib/adapters/indexeddb'),
    WebSQLDatabase: require('./lib/adapters/web-sql-database'),
    WebStorage: require('./lib/adapters/webstorage')
};
