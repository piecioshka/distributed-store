'use strict';

var request = indexedDB.open("library");

request.onupgradeneeded = () => {
    // The database did not previously exist, so create object stores and indexes.
    var db = request.result;
    var store = db.createObjectStore("books", { keyPath: "isbn" });
    var titleIndex = store.createIndex("by_title", "title", { unique: true });
    var authorIndex = store.createIndex("by_author", "author");

    // Populate with initial data.
    store.put({ title: "Quarry Memories", author: "Fred", isbn: 123456 });
    store.put({ title: "Water Buffaloes", author: "Fred", isbn: 234567 });
    store.put({ title: "Bedrock Nights", author: "Barney", isbn: 345678 });
};

request.onsuccess = () => {
    let db = request.result;
};

module.exports = {
    create() {

    },

    read() {

    },

    update() {

    },

    delete() {

    }
};
