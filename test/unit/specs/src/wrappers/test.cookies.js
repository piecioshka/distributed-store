'use strict';

let cookieStore = window.CoheStore.Cookies;

describe('error handling', function () {
    
});

describe('good work', function () {
    describe('create', function () {
        it('create single row', function (done) {
            cookieStore.create('key', 'value')
                .then(function () {

                    done();
                })
                .catch(function (error) {
                    fail(error);
                });
        });
    });

    describe('read', function () {

    });

    describe('update', function () {

    });

    describe('delete', function () {

    });
});
