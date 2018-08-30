let restructureResponsePen = require('./helpers/restructureResponsePen');
module.exports = {
    insertIntoLayout: (req, res) => {
        let { penId, gridId } = req.body;
        let { userid } = req.session;
        req.app.get('db').insert_into_layout([penId, userid, gridId])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    deleteFromLayout: (req, res) => {
        let { penId } = req.params;
        let { userid } = req.session
        req.app.get('db').delete_from_layout([penId, userid])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    updateLayout: async (req, res) => {
        let { penId, gridId } = req.body;
        let db = req.app.get('db');
        let { userid } = req.session
        db.update_layout([penId, gridId, userid])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    updateLayoutPosition: async (req, res) => {
        let { updatedGrid } = req.body;
        let db = req.app.get('db');
        let { userid } = req.session
        await updatedGrid.forEach(grid => {
            db.update_layout_order([grid.id, grid.penId, userid])
        });
        res.sendStatus(200);
    },
    updateShowcase: (req, res) => {
        let { penId, gridId, showcasePen } = req.body;
        console.log(req.body);
        let db = req.app.get('db');
        let {userid} = req.session
        // If gridId exist then we are going to switch the showcase with one of the grid items
        if (gridId) {
            db.switch_showcase([penId, 0, userid])
                .then(() => db.switch_showcase([showcasePen, gridId, userid])
                    .then(() => res.sendStatus(200))
                    .catch(err => res.status(500).send(err))
                )
                .catch(err => res.status(500).send(err))
        }
        // Otherwise we are going to update showcase with a new pen
        else {
            db.switch_showcase([penId, 0, userid])
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err));
        }

    },
    getLayoutPens: (req, res) => {
        let id;
        if(req.query.userid) {
            id = req.query.userid;
        } else {
            id = req.session.userid;
        }
        req.app.get('db').get_showcase_pens(id)
            .then(pens => {
                res.status(200).send(pens.map(pen => restructureResponsePen(pen)));
            })
            .catch(err => res.status(500).send(err))
    }
}