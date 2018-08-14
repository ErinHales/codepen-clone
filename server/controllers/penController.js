module.exports = {
    searchCdn(req, res) {
        res.status(200)
    },
    getPen(req, res) {
        res.status(200)
    },
    postPen(req, res) {
        console.log('postpen fired')
        
        const dbConn = req.app.get('db')
        
        const { user_id, name, forked, html, css, js, scripts } = req.body
        const html_script = scripts.html
        const css_stylesheet = scripts.css
        const js_script = scripts.js
        
        dbConn.post_pen([user_id, name, forked, html, css, js])
            .then( dbResponse => {
                const { pen_id } = dbResponse[0]

                if(html_script[0]) {
                    for(let i = 0; i < html_script.length; i++) {
                        dbConn.post_html_scripts([pen_id, html_script[i]])
                            .catch( err => {
                                console.error(err)
                                res.sendStatus(500)
                            })
                    }
                }

                if(css_stylesheet[0]) {
                    for(let i = 0; i < css_stylesheet.length; i++) {
                        dbConn.post_css_stylesheet([pen_id, css_stylesheet[i]])
                            .catch( err => {
                                console.error(err)
                                res.sendStatus(500)
                            }) 
                    }
                }

                if(js_script[0]) {
                    for(let i = 0; i < js_script.length; i++) {
                        dbConn.post_js_scripts([pen_id, js_script[i]])
                            .catch( err => {
                                console.error(err)
                                res.sendStatus(500)
                            })
                    }
                }

                res.sendStatus(200)
            })
            .catch( err => {
                console.error(err)
                res.sendStatus(500)
            })
    },
    updatePen(req, res) {
        res.status(200)
    },
    deletePen(req, res) {
        res.status(200)
    }
}