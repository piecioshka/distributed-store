'use strict';

var adapters = window.DistributedStore._adapters;

describe('Adapters', () => {
    describe('Cookies Adapter', () => StoreStrategy.strategy(adapters.Cookies));
    describe('FilesystemAPI Adapter', () => StoreStrategy.strategy(adapters.FilesystemAPI));
    describe('IndexedDB Adapter', () => StoreStrategy.strategy(adapters.IndexedDB));
    describe('Web SQL Database Adapter', () => StoreStrategy.strategy(adapters.WebSQLDatabase));
    describe('WebStorage Adapter', () => StoreStrategy.strategy(adapters.WebStorage));
});
