const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(express.static( __dirname+'/../build'))

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

massive(CONNECTION_STRING).then(function (db) {
    app.set("db", db);
    console.log("db is connected");
}).catch(console.error)


//////// ENDPOINTS //////////
// CONTROLLERS
const loginCntrl = require('./controllers/loginController')
const userCntrl = require('./controllers/userController')
const penCntrl = require('./controllers/penController')
const interfaceCntrl = require('./controllers/interfaceController')
const statsCntrl = require('./controllers/statsController')
const comCntrl = require('./controllers/commentsController');
const profileCntrl = require('./controllers/profileLayoutController');

// Sign a user up
app.post('/api/auth/register', (req, res) => loginCntrl.registerUser(req, res, bcrypt));
// Check when the user is loggin in
app.post('/api/auth/login', (req, res) => loginCntrl.getUser(req, res, bcrypt))


//LOGOUT 
app.get('/api/logout', (req, res) => {
    req.session.destroy()
    // res.redirect('http://localhost:3000/#/')
})


// Profile Layout 
app.post('/api/layout', profileCntrl.insertIntoLayout);
app.get('/api/layout', profileCntrl.getLayoutPens);
app.delete('/api/layout/:penId', profileCntrl.deleteFromLayout);
app.put('/api/layout/', profileCntrl.updateLayout);
app.put('/api/layout/position', profileCntrl.updateLayoutPosition);
app.put('/api/showcase', profileCntrl.updateShowcase);


// USER

// get the users information
app.get('/api/users', userCntrl.getUser)


//
// app.get('/api/loggedin', userCntrl.checkLoggedIn);

// Update a users pic
app.put('/api/user/pic', userCntrl.updateUserImg)

// takes object with new user data and updates database with changes
app.put('/api/user', userCntrl.updateUser)

// Deletes user and **EVERYTHING** associated with account
app.delete('/api/user/:userId', userCntrl.deleteUser)

// INTERFACE

// query: ?types=views or likes. will return and array of objects in descending order organized by query type
app.get('/api/pens/:pageNum', interfaceCntrl.getPens)

// query: ?types=views or likes. will return and array of objects in descending order organized by query type. Limited to user
app.get('/api/pens/user/:userId/:pageNum', interfaceCntrl.getUserPens)

// get user's own pens
// app.get('/api/pens/user/:pageNum', interfaceCntrl.getUserPens)

// PEN

// type is either css or js, query contains the search string. Sends request to cdn search, returns object of results to client
app.get('/api/pen/searchcdn/:type', penCntrl.searchCdn)

// pen id will exist on the objects that populate the explore and user's profile view
app.get('/api/pen/:penId', penCntrl.getPen)

// all data for the pen will exist on the body of the request
app.post('/api/pen/', penCntrl.postPen)

// all data, including the id, to be updated will exist on the body of the request
app.put('/api/pen/:penId', penCntrl.updatePen)

// takes penid and the scripts, comments, likes, and pen associated with penid
app.delete('/api/pen/:penId', penCntrl.deletePen)

// STATS

//get stats for a pen
app.get('/api/stats/:penId', statsCntrl.getStats)

// add a like to the likes table
app.post('/api/pen/like/:penId', statsCntrl.addLike)
app.put(`/api/stats/love/:penId`, statsCntrl.updateLike)

// get pens that a user has liked
app.get('/api/loved/pens/:penId', statsCntrl.get_loved)

// remove a like from the like table
app.delete('/api/pen/like/:penId', statsCntrl.removeLike) 

//get likes
app.get('/api/pen/likes/:penId', penCntrl.getLikes)

//increment view by one for each view
app.put('/api/pen/view/:penId/:userId', statsCntrl.incrementView)

//update number of comments
app.put('/api/stats/comments/:penId', statsCntrl.addComment)


// COMMENTS

// get all comments for a pen
app.get('/api/pen/comments/:penId', comCntrl.getComments)

// post comment
app.post('/api/pen/comment/:penId', comCntrl.comment)



// SEARCH

// search all pens by title and description by popularity or currency
app.get('/api/search/pens/:pageNum', interfaceCntrl.searchPens)

// search all users
app.get('/api/search/users', userCntrl.searchUser)

// search user's pens
app.get('/api/search/userpens/:pageNum', userCntrl.searchUserPens)




// get user info for profile page
app.get('/api/userinfo', userCntrl.getUserInfo)

// add user's info into database
app.post('/api/setuserinfo', userCntrl.createUserInfo)

// updates user's info
app.put('/api/update/userinfo', userCntrl.updateUserInfo)

// update user name
app.put('/api/update/name', userCntrl.updateUserName)

// update user theme
app.put('/api/user/theme', userCntrl.updateTheme)



app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port: ${SERVER_PORT}`);
})