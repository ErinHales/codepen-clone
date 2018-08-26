module.exports = {
    insertIntoLayout: (req, res) => {
        let { penId, gridId } = req.body;
        // let {user_id} = req.session
        req.app.get('db').insert_into_layout([penId, 3, gridId])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    deleteFromLayout: (req, res) => {
        let { penId } = req.params;
        req.app.get('db').delete_from_layout([penId])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    updateLayout: (req, res) => {
        let { penId, gridId } = req.body;
        req.app.get('db').update_layout([penId, gridId])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    updateShowcase: (req, res) => {
        let { penId, gridId, showcasePen } = req.body;
        let db = req.app.get('db');
        db.switch_showcase([penId, 0])
            .then(() => db.switch_showcase([showcasePen, gridId])
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err))
            )
            .catch(err => res.status(500).send(err))
    }
}