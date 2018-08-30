const loginFns = require('../../src/utils/LoginFunctions');

describe('test for authenticating  users', () => {
    test('A response for a valid user should be defined', () => {
        return loginFns.login()
            .then(res => {
                expect(res).toBeDefined();
            })

    });
    test('A response for a valid user should equal OK', () => {
        return loginFns.login('test', 'test')
            .then(res => {
                expect(res).toEqual('OK');
            })
    });

    test('should return an error message when username does not exist', () =>{
        return loginFns.login('thisUsernameDoesNotExist', 'test')
            .then(res => {
                expect(res).toEqual('No user exist with that username');
            })
    });
    test('should return an error message when email does not exist', () =>{
        return loginFns.login('thisEmailDoesNotExist@gmail.com', 'test')
            .then(res => {
                expect(res).toEqual('No user exist with that email');
            })
    });

    test('should return password did not match the username when the wrong password is inputted with a username', () =>{
        return loginFns.login('test', 'wrongPassword')
        .then(res => {
            expect(res).toEqual('Password did not match the username');
        })
    });
    test('should return password did not match the email when the user enters the wrong password for an email', () =>{
        return loginFns.login('alan.ibarra209@gmail.com', 'thisPasswordIsWrong')
        .then(res => {
            expect(res).toEqual('Password did not match the email');
        })
    })
});



