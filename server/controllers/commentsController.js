module.exports = {
    getComments(req, res) {
        req.app.get("db").get_comments(req.params.penId).then(response => {
            res.status(200).send(response);
        }).catch(console.error());
    },
    comment(req, res) {
        console.log(req.session);
        req.app.get("db").comment([req.session.userid, req.params.penId, req.body.comment]).then(response => {
            res.status(200).send(response);
        }).catch(console.error);
    }
}