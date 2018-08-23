const restructureResponsePen = require('./helpers/restructureResponsePen')

module.exports = {
    getPens(req, res) {
        const dbConn = req.app.get('db')
        // to be implemented
        let {pageNum} = req.params;
        let offset = parseInt(pageNum) * 6;
        if(req.query) {
            if(req.query.type === 'views') {
                dbConn.get_most_viewed_pens(offset)
                    .then( dbResponse => {
                        res.status(200).send(dbResponse.map( pen => restructureResponsePen(pen)))
                    })
                    .catch( err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
            }
            else if(req.query.type === 'likes') {
                dbConn.get_most_liked_pens(offset)
                    .then( dbResponse => {
                        res.status(200).send(dbResponse.map( pen => restructureResponsePen(pen)))
                    })
                    .catch( err => {
                        console.error(err)
                        res.sendStatus(500)
                    })                        
            }
            else if(req.query.type === 'new') {
                dbConn.get_new_pens(offset)
                    .then( dbResponse => {
                        res.status(200).send(dbResponse.map( pen => restructureResponsePen(pen)))
                    })
                    .catch( err => {
                        console.error(err)
                        res.sendStatus(500)
                    })                        
            }
            else {
                res.sendStatus(400)
            }
        }
        else {
            res.sendStatus(400)
        }
    },
    getUserPens(req, res) {
        const dbConn = req.app.get('db')
        // pagination to be implemented
        let { userId, pageNum } = req.params
        if(userId === 'undefined') {
            res.sendStatus(401)
            return
        }
        let offset = parseInt(pageNum) * 6;
        if(req.query) {
            if(req.query.type === 'views') {
                dbConn.get_most_viewed_user_pens([userId, offset])
                    .then( dbResponse => {
                        res.status(200).send(dbResponse.map( pen => restructureResponsePen(pen)))
                    })
                    .catch( err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
            }
            else if(req.query.type === 'likes') {
                dbConn.get_most_liked_user_pens([userId, offset])
                    .then( dbResponse => {
                        res.status(200).send(dbResponse.map( pen => restructureResponsePen(pen)))
                    })
                    .catch( err => {
                        console.error(err)
                        res.sendStatus(500)
                    })                        
            }
            else if(req.query.type === 'new') {
                dbConn.get_new_user_pens([userId, offset])
                    .then( dbResponse => {
                        res.status(200).send(dbResponse.map( pen => restructureResponsePen(pen)))
                    })
                    .catch( err => {
                        console.error(err)
                        res.sendStatus(500)
                    })                        
            }
            else {
                res.sendStatus(400)
            }
        }
        else {
            res.sendStatus(400)
        }
    }
}