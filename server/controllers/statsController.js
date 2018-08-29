module.exports = {
    addLike(req, res) {
        req.app.get("db").add_like([req.session.userid, req.params.penId]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.sendStatus(500);
            console.error(err)
        });
    },
    updateLike(req,res) {
        req.app.get("db").update_like([req.params.penId, req.body.num]).catch(err => {
            console.error(err)
            res.sendStatus(500)
        });
    },
    get_loved(req,res) {
        req.app.get("db").get_loves([req.session.userid, req.params.penId]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            console.error(err)
            res.sendStatus(500)
        });
    },
    removeLike(req, res) {
        req.app.get("db").delete_love([req.session.userid, req.params.penId]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            console.error(err)
            res.sendStatus(500)
        });
    },
    incrementView(req, res) {
        if(req.params.userId !== req.session.userid) {
            req.app.get("db").update_views_stats([req.params.penId]).catch(err => {
                console.error(err)
                res.sendStatus(500)
            });
        }
    },
    getStats(req, res) {
        req.app.get("db").get_stats([req.params.penId]).then(response => {
            res.status(200).send(response);
        }).catch(err => {
            console.error()
            res.sendStatus(500)
        });
    },
    addComment(req, res) {
        req.app.get("db").update_comments_stats([req.params.penId, req.body.commentNum]).catch(err => {
            console.error(err)
            res.sendStatus(500)
        })
    }
}