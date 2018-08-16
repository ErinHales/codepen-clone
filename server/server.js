const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());


const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

// app.use(session({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

massive(CONNECTION_STRING).then(function (db) {
    app.set("db", db);
    console.log("db is connected");
}).catch(err => {
    console.log(err);
})


//////// ENDPOINTS //////////
// CONTROLLERS
const loginCntrl = require('./controllers/loginController')
const userCntrl = require('./controllers/userController')
const penCntrl = require('./controllers/penController')
const interfaceCntrl = require('./controllers/interfaceController')
const statsCntrl = require('./controllers/statsController')

// LOGIN
app.post('/api/auth/register', (req, res) => loginCntrl.registerUser(req, res, bcrypt));
app.post('/api/auth/login', (req, res) => loginCntrl.getUser(req, res, bcrypt))



// USER

// takes object with new user data and updates database with changes
app.put('/api/user', userCntrl.updateUser)

// Deletes user and **EVERYTHING** associated with account
app.delete('/api/user/:userId', userCntrl.deleteUser)

// INTERFACE

// query: ?types=views or likes. will return and array of objects in descending order organized by query type
app.get('/api/pens/:pageNum', interfaceCntrl.getPens)

// query: ?types=views or likes. will return and array of objects in descending order organized by query type. Limited to user
app.get('/api/pens/user/:userId/:pageNum', interfaceCntrl.getUserPens)

// PEN

// type is either css or js, query contains the search string. Sends request to cdn search, returns object of results to client
app.get('/api/pen/searchcdn/:type', penCntrl.searchCdn)

// pen id will exist on the objects that populate the explore and user's profile view
app.get('/api/pen/:penId', penCntrl.getPen)

// all data for the pen will exist on the body of the request
app.post('/api/pen/', penCntrl.postPen)

// all data, including the id, to be updated will exist on the body of the request
app.put('/api/pen/', penCntrl.updatePen)

// takes penid and the scripts, comments, likes, and pen associated with penid
app.delete('/api/pen/:penId', penCntrl.deletePen)

// STATS

// add a like to the likes table
app.post('/api/pen/like/:penId/:userId', statsCntrl.addLike)

// remove a like from the like table
app.delete('/api/pen/like/:penId/:userId', statsCntrl.removeLike)

//increment view by one for each unique user
app.put('/api/pen/view/:penId/:userId', statsCntrl.incrementView)




app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port: ${SERVER_PORT}`);
})