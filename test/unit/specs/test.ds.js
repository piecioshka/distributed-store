'use strict';

describe('Distributed Store', () => {
    it('should be defined', () => {
        expect(window.DistributedStore).toEqual(jasmine.any(Object));
    });

    describe('Public API', () => {
        let KEY = 'ds:api:key';
        let NON_EXIST_KEY = 'ds:api:key-non-exist';
        let VALUE = 'ds-value';
        let NEW_VALUE = 'ds-value-new';

        it('should contains 4 methods', () => {
            let methods = ['create', 'read', 'update', 'delete'];

            methods.forEach((method) => {
                expect(window.DistributedStore[method]).toEqual(jasmine.any(Function));
            });
        });

        describe('API: create', () => {
            it('should all item be undefined', (done) => {
                window.DistributedStore.read(KEY)
                    .then((response) => {
                        response.forEach((options) => {
                            expect(options.value).toBe(undefined);
                        });
                        done();
                    });
            });

            it('should create everywhere new store items', (done) => {
                window.DistributedStore.create(KEY, VALUE)
                    .then((results) => {
                        results.forEach((options) => {
                            expect(options.success).toBe(true);
                        });
                        done();
                    });
            });

            it('should all created items has a new value', (done) => {
                window.DistributedStore.read(KEY)
                    .then((response) => {
                        response.forEach((options) => {
                            expect(options.value).toBe(VALUE);
                        });
                        done();
                    });
            });
        });

        describe('API: read', () => {
            it('should read from', (done) => {
                window.DistributedStore.read(KEY)
                    .then((response) => {
                        response.forEach((options) => {
                            expect(options.value).toBe(VALUE);
                        });
                        done();
                    });
            });
        });

        describe('API: update', () => {
            it('should update everywhere', (done) => {
                window.DistributedStore.update(KEY, NEW_VALUE)
                    .then((results) => {
                        results.forEach((options) => {
                            expect(options.success).toBe(true);
                        });
                        done();
                    });
            });

            it('should all updated items have a new value', (done) => {
                window.DistributedStore.read(KEY)
                    .then((response) => {
                        response.forEach((options) => {
                            expect(options.value).toBe(NEW_VALUE);
                        });
                        done();
                    });
            });
        });

        describe('API: delete', () => {
            it('should delete everywhere without errors', (done) => {
                window.DistributedStore.delete(KEY, VALUE)
                    .then((results) => {
                        results.forEach((options) => {
                            expect(options.success).toBe(true);
                        });
                        done();
                    });
            });

            it('should be undefined of all deleted items', (done) => {
                window.DistributedStore.read(KEY)
                    .then((response) => {
                        response.forEach((options) => {
                            expect(options.value).toBe(undefined);
                        });
                        done();
                    });
            });

            it('should deleted non existed values too', (done) => {
                window.DistributedStore.delete(NON_EXIST_KEY)
                    .then((response) => {
                        response.forEach((options) => {
                            expect(options.success).toBe(true);
                        });
                        done();
                    });
            });
        });
    });
});
