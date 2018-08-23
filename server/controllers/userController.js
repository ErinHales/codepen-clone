module.exports = {
    getUser(req,res) {
        if(req.query.id) {
            req.app.get("db").get_user(req.query.id).then(response => {
                res.status(200).send(response);
            })
        } else {
            let {name, img_url, username} = req.session;
            res.send({name, img_url, username});
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
    searchUser(req, res) {
        let {search} = req.query;
        let newSearch = `%${search}%`;
        req.app.get('db').search_users([newSearch]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
            console.error();
        })
    }
}