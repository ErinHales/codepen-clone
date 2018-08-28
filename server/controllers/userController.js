module.exports = {
    getUser(req, res) {
        if (req.query.id) {
            req.app.get("db").get_user(req.query.id).then(response => {
                res.status(200).send(response);
            })
        } else {
            let { name, img_url, username, userid } = req.session;
            res.send({ name, img_url, username, userid });
        }
    },
    deleteUser(req, res) {
        res.status(200)
    },
    updateUser(req, res) {
        res.status(200)
    },
    updateUserImg(req, res) {
        let { imgUrl } = req.body;
        req.app.get('db').update_user_pic([req.session.userid, imgUrl])
            .then(() => {
                req.session.img_url = imgUrl;
                res.sendStatus(200);
            })
            .catch(err => res.status(500).send(err))
    },
    updateUserName(req, res) {
        let {name} = req.body;
        req.app.get('db').update_user_name([req.session.userid, name]).then(() => {
            req.session.name = name;
        }).catch(err => {
            res.status(500);
            console.error(err);
        })
    },
    searchUser(req, res) {
        let { search } = req.query;
        let newSearch = `%${search}%`;
        req.app.get('db').search_users([newSearch]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.error();
        })
    },
    searchUserPens(req, res) {
        let {pageNum, userId} = req.params;
        let {search} = req.query;
        let id;
        if (userId !== 0) {
            id = userId;
        } else {
            id = req.session.userid;
        }
        req.app.get("db").search_user_pens([id, pageNum, search])
    },
    getUserInfo(req, res) {

        req.app.get("db").get_user_info(req.session.userid).then(response => {
            res.status(200).send(response);
        })
    },
    createUserInfo(req, res) {
        let { location, bio, link1, link2, link3, forHire, theme } = req.body;
        req.app.get("db").add_user_info([req.session.userid, location, bio, link1, link2, link3, forHire, theme]).then(() => {
            res.sendStatus(200);
        }).catch(console.error);
    },
    updateUserInfo(req, res) {
        let { location, bio, link1, link2, link3, forHire } = req.body;
        req.app.get("db").update_user_info([req.session.userid, location, bio, link1, link2, link3, forHire, theme]).then(() => {
            res.sendStatus(200);
        }).catch(console.error);
    },
    updateTheme(req, res) {
        req.app.get("db").update_theme([req.session.userid, req.body.theme]).then(() => {
            res.sendStatus(200);
        }).catch(console.error);
    }
}