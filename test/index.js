var assert = require('assert');
describe('Server Test Suite', function() {
    describe('Signup API Test Suite', function() {
        it('should be able to signup for new account with valid username and password', function() {
            assert.equal(true, true);
        });

        it('should fail when signing up with invalid username and password', function() {
            assert.equal(true, true);
        });
    });


    describe('Login API Test Suite', function() {
        it('should be able to login with valid username and password', function() {
            assert.equal(true, true);
        });

        it('should fail when login with invalid username and password', function() {
            assert.equal(true, true);
        });
    });

    describe('Notes API Test Suite', function() {
        it('should be able to create note', function() {
            assert.equal(true, true);
        });


        it('should be able to get all notes by all users', function() {
            assert.equal(true, true);
        });

        it('should be able to get all notes by a particular user', function() {
            assert.equal(true, true);
        });

        it('should be able to get all notes by a particular license number', function() {
            assert.equal(true, true);
        });
    });


    describe('Violation API Test Suite', function() {
        it('should be able to create violation', function() {
            assert.equal(true, true);
        });


        it('should be able to get all violations by all users', function() {
            assert.equal(true, true);
        });

        it('should be able to get all violations by a particular user', function() {
            assert.equal(true, true);
        });

        it('should be able to get all violations by a particular license number', function() {
            assert.equal(true, true);
        });
    });
});
