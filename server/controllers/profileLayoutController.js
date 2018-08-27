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
    updateLayout: async (req, res) => {
        let { penId, gridId } = req.body;
        let db = req.app.get('db');
        db.update_layout([penId, gridId])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    updateLayoutPosition: async (req, res) => {
        let { updatedGrid } = req.body;
        let db = req.app.get('db');
        await updatedGrid.forEach(grid => {
            db.update_layout_order([grid.id, grid.penId])
        });
        res.sendStatus(200);
    },
    updateShowcase: (req, res) => {
        let { penId, gridId, showcasePen } = req.body;
        let db = req.app.get('db');
        // If gridId exist then we are going to switch the showcase with one of the grid items
        if (gridId) {
            db.switch_showcase([penId, 0])
                .then(() => db.switch_showcase([showcasePen, gridId])
                    .then(() => res.sendStatus(200))
                    .catch(err => res.status(500).send(err))
                )
                .catch(err => res.status(500).send(err))
        }
        // Otherwise we are going to update showcase with a new pen
        else {
            db.switch_showcase([penId, 0])
                .then(() => res.sendStatus(200))
                .catch(err => res.status(500).send(err));
        }

    }
}