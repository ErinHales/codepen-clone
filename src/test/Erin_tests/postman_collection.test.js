///////////////ERIN////////////////////////////

//getUserData - profileFunctions

pm.test("should return ok response", function () {
    pm.response.to.be.ok;
})

pm.test("has status code 200", function () {
    pm.response.to.have.status(200);
})

pm.test("should return json", function () {
    pm.response.to.be.json;
})

pm.test("should return body", function () {
    pm.response.to.be.withBody;
})

// getUserInfo - profileFunctions