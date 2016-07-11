'use strict';

describe('Distributed Store', () => {
    it('should be defined', () => {
        expect(window.DistributedStore).toEqual(jasmine.any(Object));
    });

    describe('Public API', () => {
        it('should contains 4 methods', () => {
            let methods = ['create', 'read', 'update', 'delete'];

            methods.forEach((method) => {
                expect(window.DistributedStore[method]).toEqual(jasmine.any(Function));
            })
        })
    });
});
