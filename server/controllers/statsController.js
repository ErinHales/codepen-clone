module.exports = {
    addLike(req, res) {
        res.status(200)
    },
    removeLike(req, res) {
        res.status(200)
    },
    incrementView(req, res) {
        res.status(200)
    },
    getNumComments(req, res) {
        req.app.get("db").get_num_comments(req.params.id).then(response => {
            res.status(200).send(response);
        }).catch(console.error());
    },
    getNumViews(req, res) {
        req.app.get("db").get_num_views(req.params.id).then(response => {
            res.status(200).send(response);
        }).catch(console.error());
    },
    getNumLikes(req, res) {
        req.app.get("db").get_num_likes(req.params.id).then(response => {
            res.status(200).send(response);
        }).catch(console.error());
    }
}