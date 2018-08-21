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
    getStats(req, res) {
        req.app.get("db").get_stats([req.params.penId]).then(response => {
            res.status(200).send(response);
        }).catch(console.error());
    }
}