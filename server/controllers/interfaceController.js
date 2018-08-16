const restructureResponsePen = require('./helpers/restructureResponsePen')

module.exports = {
    getPens(req, res) {
        const dbConn = req.app.get('db')
        // to be implemented
        const pageNum = req.params
        if(req.query) {
            if(req.query.type === 'views') {
                dbConn.get_most_viewed_pens()
                    .then( dbResponse => {
                        res.status(200).send(dbResponse.map( pen => restructureResponsePen(pen)))
                    })
                    .catch( err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
            }
            else if(req.query.type === 'likes') {
                dbConn.get_most_liked_pens()
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
        const { userId, pageNum } = req.params
        console.log(userId)
        if(req.query) {
            if(req.query.type === 'views') {
                dbConn.get_most_viewed_user_pens([userId])
                    .then( dbResponse => {
                        res.status(200).send(dbResponse.map( pen => restructureResponsePen(pen)))
                    })
                    .catch( err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
            }
            else if(req.query.type === 'likes') {
                dbConn.get_most_liked_user_pens([userId])
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