'use strict';

let StoreStrategy = {
    strategy(storeStrategy) {
        describe('error handling', () => {

        });

        describe('good work', () => {
            describe('create', () => {
                it('single item', function (done) {
                    let KEY = 'distributed-store:test-create';
                    let VALUE = 'magic-string';

                    Promise.resolve()
                        .then(storeStrategy.create.bind(this, KEY, VALUE))
                        .then((options) => {
                            expect(options.success).toEqual(true);
                        })
                        .then(storeStrategy.read.bind(this, KEY))
                        .then((options) => {
                            expect(options.value).toEqual(VALUE);
                        })
                        .then(storeStrategy.remove.bind(this, KEY))
                        .then((options) => {
                            expect(options.success).toEqual(true);
                        })
                        .then(done);
                });
            });

            describe('read', () => {
                it('should return undefined when value is not exist', (done) => {
                    let KEY = 'distributed-store:test-read-not-exists';

                    storeStrategy.read(KEY)
                        .then((options) => {
                            expect(options.value).toEqual(undefined);
                            done();
                        });
                });

                it('should return proper value', (done) => {
                    let KEY = 'distributed-store:test-read';
                    let VALUE = 'string';

                    Promise.resolve()
                        .then(storeStrategy.create.bind(this, KEY, VALUE))
                        .then((options) => {
                            expect(options.success).toEqual(true);
                        })
                        .then(storeStrategy.read.bind(this, KEY))
                        .then((options) => {
                            expect(options.value).toEqual(VALUE);
                        })
                        .then(storeStrategy.remove.bind(this, KEY))
                        .then((options) => {
                            expect(options.success).toEqual(true);
                        })
                        .then(done);
                });
            });

            describe('update', () => {
                it('should work properly', (done) => {
                    let KEY = 'distributed-store:test-update';
                    let VALUE = 'string';
                    let NEW_VALUE = 'new-string';

                    Promise.resolve()
                        .then(storeStrategy.create.bind(this, KEY, VALUE))
                        .then((options) => {
                            expect(options.success).toEqual(true);
                        })
                        .then(storeStrategy.update.bind(this, KEY, NEW_VALUE))
                        .then((options) => {
                            expect(options.success).toEqual(true);
                        })
                        .then(storeStrategy.read.bind(this, KEY))
                        .then((options) => {
                            expect(options.value).toEqual(NEW_VALUE);
                        })
                        .then(storeStrategy.remove.bind(this, KEY))
                        .then((options) => {
                            expect(options.success).toEqual(true);
                        })
                        .then(done);
                })
            });

            describe('remove', () => {
                it('should fail when try to remove non-exist item', (done) => {
                    let KEY = 'file-not-defined';

                    Promise.resolve()
                        .then(storeStrategy.remove.bind(this, KEY))
                        .then((options) => {
                            expect(options.success).toEqual(true);
                            expect(true).toBe(true);
                            done();
                        });
                });

                it('should works after remove created item', (done) => {
                    let KEY = 'distributed-store:test-remove';
                    let VALUE = 'pikachu';

                    Promise.resolve()
                        .then(storeStrategy.create.bind(this, KEY, VALUE))
                        .then((options) => {
                            expect(options.success).toEqual(true);
                        })
                        .then(storeStrategy.read.bind(this, KEY))
                        .then((options) => {
                            expect(options.value).toEqual(VALUE);
                        })
                        .then(storeStrategy.remove.bind(this, KEY))
                        .then((options) => {
                            expect(options.success).toEqual(true);
                            expect(true).toBe(true);
                            done();
                        });
                });
            });
        });
    }
};
