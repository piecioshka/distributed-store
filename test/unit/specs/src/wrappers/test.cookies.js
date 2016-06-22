'use strict';

let cookieStore = window.CoheStore.Cookies;

describe('error handling', () => {

});

describe('good work', () => {
    describe('create', () => {
        it('create single row', function (done) {
            cookieStore.create('key', 'magic-value')
                .then(() => {
                    cookieStore.read('key').then((value) => {
                        expect(value).toEqual('magic-value');
                        done();
                    });
                });
        });
    });

    describe('read', () => {

    });

    describe('update', () => {

    });

    describe('delete', () => {

    });
});
