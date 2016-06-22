'use strict';

let StoreStrategy = {
    strategy(storeStrategy) {
        describe('error handling', () => {

        });

        describe('good work', () => {
            describe('create', () => {
                it('single item', function (done) {
                    let KEY = 'key';
                    let VALUE = 'magic-string';

                    Promise.resolve()
                        .then(storeStrategy.create.bind(this, KEY, VALUE))
                        .then(storeStrategy.read.bind(this, KEY))
                        .then((value) => {
                            expect(value).toEqual(VALUE);
                        })
                        .then(storeStrategy.delete.bind(this, KEY))
                        .then(done);
                });
            });

            describe('read', () => {
                it('should return non when non exist value', (done) => {
                    storeStrategy.read('1khj23jk123kj123')
                        .then((value) => {
                            expect(value).toEqual(undefined);
                        })
                        .then(done);
                });

                it('should return proper value', (done) => {
                    let KEY = 'proper';
                    let VALUE = 'string';

                    Promise.resolve()
                        .then(storeStrategy.create.bind(this, KEY, VALUE))
                        .then(storeStrategy.read.bind(this, KEY))
                        .then((value) => {
                            expect(value).toEqual(VALUE);
                        })
                        .then(storeStrategy.delete.bind(this, KEY))
                        .then(done);
                });
            });

            describe('update', () => {
                it('should work properly', (done) => {
                    let KEY = 'proper';
                    let VALUE = 'string';
                    let NEW_VALUE = 'new-string';

                    Promise.resolve()
                        .then(storeStrategy.create.bind(this, KEY, VALUE))
                        .then(storeStrategy.update.bind(this, KEY, NEW_VALUE))
                        .then(storeStrategy.read.bind(this, KEY))
                        .then((value) => {
                            expect(value).toEqual(NEW_VALUE);
                        })
                        .then(storeStrategy.delete.bind(this, KEY))
                        .then(done);
                })
            });

            describe('delete', () => {
                it('should not fail on non exist item', (done) => {
                    let KEY = 'blabla';

                    Promise.resolve()
                        .then(storeStrategy.delete.bind(this, KEY))
                        .then((status) => {
                            expect(status).toBe(true);
                        })
                        .then(done)
                        .catch(() => {
                            fail();
                        });
                });

                it('should not fail on non exist item', (done) => {
                    let KEY = 'pokemon';
                    let VALUE = 'pikachu';

                    Promise.resolve()
                        .then(storeStrategy.create.bind(this, KEY, VALUE))
                        .then(storeStrategy.read.bind(this, KEY))
                        .then((value) => {
                            expect(value).toEqual(VALUE);
                        })
                        .then(storeStrategy.delete.bind(this, KEY))
                        .then((status) => {
                            expect(status).toBe(true);
                        })
                        .then(done)
                        .catch(() => {
                            fail();
                        });
                });
            });
        });
    }
};
