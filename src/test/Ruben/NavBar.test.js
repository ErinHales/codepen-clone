const navbar1 = require('./NavBarTest.js');

describe('NavBar Properties', async () => {
  // let response = await navbar1.getUserData()
  // console.log(response)

  test('should expect data', ()=>{
    navbar1.getUserData().then((response) =>
      expect(response.data).toEqual(true)    
    )
  })

  test('res.data should be an object', () => {
    navbar1.getUserData().then((response) =>
    expect(typeof response.data).toEqual('object')    
  )
  })

  test('res.data should contain userid', () => { navbar1.getUserData().then((response)=>{
      expect(response.data.userid).toEqual(true)
    })
  })

  test('res.data.userid should contain a number', () => {
    navbar1.getUserData().then((response) => {
      expect(typeof response.data.userid).toEqual('number')
    })
  })

  test('res.data should contain username', () => { navbar1.getUserData().then((response)=>{
    expect(response.data.username).toEqual(true)
  })
})


})