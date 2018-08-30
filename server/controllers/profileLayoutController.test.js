const profileFns = require('../../src/utils/ProfileLayoutFunctions');

describe('tests for the users showcase', () =>{
    beforeEach( async () =>{
      await  profileFns.getUser()
        .then(res =>{
            expect(res).toEqual('test')
        })
    })
    test('the users showcase pens should be a  object', () =>{
        profileFns.getPenLayout()
        .then(res =>{
            expect(typeof res).toEqual('object');
        })
    });
    test('the users first showcase pen should have position', ()=>{
        profileFns.getPenLayout()
        .then(res =>{
            console.log(res);
            expect(res).toEqual(0);
        })
    })
 
})