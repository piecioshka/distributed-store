'use strict';

module.exports = {
    Cookies: require('./src/wrappers/cookies'),
    FileSystemAPI: require('./src/wrappers/filesystem-api'),
    IndexedDB: require('./src/wrappers/indexeddb'),
    WebSQLDatabase: require('./src/wrappers/web-sql-database'),
    WebStorage: require('./src/wrappers/webstorage')
};
