const profileFunctions = require('./utils/profileFunctions');

describe("Tests for getUserData", () => {
  test('getUserData returns data', () => {
    expect(profileFunctions.getUserData()).toBeDefined();
  })
  test("should return an object", () => {
    expect(profileFunctions.getUserData()).hasOwnProperty("name");
  })
  test('Should return object', () => {
    profileFunctions.getUserData().then(res => {
      expect(res).toEqual({ img_url: null, name: "Alan Ibarra", username: "aibrra" });
    });
  })
  test('Should return object with name "Alan Ibarra"', () => {
    profileFunctions.getUserData().then(res => {
      expect(res.name).toBe("Alan Ibarra");
    });
  })
  test('Should return object with name "Alan Ibarra"', () => {
    profileFunctions.getUserData().then(res => {
      expect(res.username).toBe("aibrra");
    });
  })
  test('Should return object with name "Alan Ibarra"', () => {
    profileFunctions.getUserData().then(res => {
      expect(res.img_url).toBe(null);
    })
  })
})


describe("tests for getNewUserPens", () => {
  test('Should return data', () => {
    expect(profileFunctions.getNewUserPens()).toBeDefined();
  })
  test("should return an object", () => {
    expect(profileFunctions.getNewUserPens()).hasOwnProperty("description");
  })
  test('Should return pen object with name "Alan Ibarra"', () => {
    profileFunctions.getUserData().then(res => {
      expect(res.username).toBe("Alan Ibarra");
    });
  })
})

describe("get newest pens first, i.e., id should decrease", () => {
  test('Should return data', () => {
    expect(profileFunctions.getPensByCurrency()).toBeDefined();
  })
  test("should return an object", () => {
    expect(profileFunctions.getPensByCurrency()).hasOwnProperty("description");
  })
  test("should order by id descending", () => {
    profileFunctions.getPensByCurrency().then(res => {
      expect(res[0].pen_id).toBeLessThanOrEqual(res[1].pen_id);
    })
  })
})