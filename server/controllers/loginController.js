module.exports = {
    registerUser: async (req, res, bcrypt) => {
        let { name, username, email, password } = req.body;
        bcrypt.hash(password, null, null, (err, hash) => {
            req.app.get('db').register_user([name, hash, username, email])
                .then(user => {
                    let { id, username, email, name, img_url, likes } = user[0];
                    req.session.userid = id;
                    req.session.username = username;
                    req.session.email = email;
                    req.session.name = name;
                    req.session.img_url = img_url;
                    res.sendStatus(200);
                })
                .catch(err => res.sendStatus(500));
        })
    },
    getUser: (req, res, bcrypt) => {
        let { credentials, password } = req.body;
        /* 
            This is a regex expression that test whethere credentials is a
            an email.  If it is than will search for that users password with the email.
            Otherwise, we will search for that users password with the email
        */
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(credentials)) {
            req.app.get('db').find_user_by_email([credentials])
                .then(user => {
                    let { id, bcrypt_password, username, email, name, img_url, likes } = user[0];
                    req.session.userid = id;
                    req.session.username = username;
                    req.session.email = email;
                    req.session.name = name;
                    req.session.img_url = img_url;
                    bcrypt.compare(password, bcrypt_password, (error, response) => {
                        (response ? res.sendStatus(200) : res.send('Password did not match the email'))
                    })
                })
                .catch(err => res.send('No user exist with that email'))
        }
        else {
            req.app.get('db').find_user_by_username([credentials])
                .then(user => {
                    let { id, bcrypt_password, username, email, name, img_url, likes } = user[0];
                    req.session.userid = id;
                    req.session.username = username;
                    req.session.email = email;
                    req.session.name = name;
                    req.session.img_url = img_url;
                    bcrypt.compare(password, bcrypt_password, (error, response) => {
                        (response ? res.sendStatus(200) : res.send('Password did not match the username'))
                    })
                })
                .catch(err => res.send('No user exist with that username'))
        }
    },
}