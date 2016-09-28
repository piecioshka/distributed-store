let debug = {
    log: require('debug')('DistributedStore:CookiesAdapter:log'),
    info: require('debug')('DistributedStore:CookiesAdapter:info'),
    warn: require('debug')('DistributedStore:CookiesAdapter:warn'),
    error: require('debug')('DistributedStore:CookiesAdapter:error')
};

let cookie = require('cookie_js').cookie;

// Cookies Adapter API

function create(key, value) {
    return new Promise((resolve) => {
        cookie.set(key, value);

        let status = (cookie.get(key) === value);
        debug.log('create');
        resolve({ success: status });
    });
}

function read(key) {
    return new Promise((resolve) => {
        let value = cookie.get(key);
        debug.log('read');
        resolve({ value: value });
    });
}

function remove(key) {
    return new Promise((resolve) => {
        cookie.remove(key);

        let status = (cookie.get(key) === undefined);
        debug.log('remove');
        resolve({ success: status });
    });
}

function update(key, value) {
    return create(key, value);
}

module.exports = {
    create,
    read,
    update,
    remove
};
