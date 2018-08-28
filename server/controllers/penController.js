const restructureResponsePen = require('./helpers/restructureResponsePen')
const axios = require('axios')

module.exports = {
    searchCdn(req, res) {
        const { type } = req.params
        if(type === 'css' || type === 'js') {
            const { search } = req.query
            axios.get(`https://api.cdnjs.com/libraries?search=${search}&fields=version,description`)
                .then( response => {
                    res.send(response.data.results.filter( result => result.latest.endsWith(`.${type}`)).slice(0,10)).status(200)
                })
                .catch( err => {
                    console.error(err)
                    res.sendStatus(500)
                })
        }
        else {
            res.sendStatus(400)
        }
    },
    getPen(req, res) {
        // check for pen_id from request
        //console.log(req.session)
        if(!req.params.penId) {
            res.sendStatus(400)
            return
        }

        const dbConn = req.app.get('db')
        const { penId } = req.params
        // retreive pen and its dependencies from db
        dbConn.get_pen([penId])
            .then( dbResponse => {
                // console.log(dbResponse)
                let pen = dbResponse[0]
                if(pen) {
                    // restructure pen object for consistency
                    const restructuredPen = restructureResponsePen(pen)
                    res.send(restructuredPen).status(200)
                }
                else {
                    res.sendStatus(404)
                }
            })
            .catch( err => {
                console.error(err)
                res.sendStatus(500)
            })
        res.status(200)
    },
    postPen(req, res) {
        // Setting db Connection to variable
        const dbConn = req.app.get('db')
        // Destructure variables off of body
        const { userid:user_id } = req.session
        const { name, description, forked, html, css, js, scripts } = req.body
        const html_script = scripts.html
        const css_stylesheet = scripts.css
        const js_script = scripts.js
        const { html_tag_class, head_tag } = html_script

        // Create Pen from variables
        //console.log('userid', user_id,'name', name, forked, html, css, js)
        dbConn.post_pen([user_id, name, description, forked, html, css, js])
            .then( dbResponse => {
                // setting the pen_id from the newly created row to a a variable
                const { pen_id } = dbResponse[0]
                //add single page view for user
                dbConn.post_like([user_id, pen_id])
                    .catch( err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
                // check to see if the request from the client contains any html settings content
                //console.log('html tag and head', html_tag_class, head_tag)
                // if(html_tag_class || head_tag) {
                    //Adding the content if it exists
                    dbConn.post_html_scripts([pen_id, html_tag_class, head_tag])
                        .catch( err => {
                            console.error(err)
                            res.sendStatus(500)
                        })
                // }
                // check to see if the request from the client contains any css settings content
                //console.log('stylesheet', css_stylesheet)
                if(css_stylesheet[0]) {
                    //Adding the content if it exists
                    for(let i = 0; i <= css_stylesheet.length; i++) {
                        dbConn.post_css_stylesheet([pen_id, css_stylesheet[i]])
                            .catch( err => {
                                console.error(err)
                                res.sendStatus(500)
                            }) 
                    }
                }
                // check to see if the request from the client contains any javascript settings content
                //console.log('jsscript', js_script)
                if(js_script[0]) {
                    //Adding the content if it exists
                    for(let i = 0; i <= js_script.length; i++) {
                        dbConn.post_js_scripts([pen_id, js_script[i]])
                            .catch( err => {
                                console.error(err)
                                res.sendStatus(500)
                            })
                    }
                }
                console.log('post')
                res.send(dbResponse).status(201)
            })
            .catch( err => {
                console.error(err)
                res.sendStatus(500)
            })
    },
    updatePen(req, res) {
        const { userid: user_id } = req.session
        if(user_id){
            // Setting db Connection to variable
            const dbConn = req.app.get('db')
            // Destructure variables off of body
            const { penId: pen_id} = req.params
            const { name, description, html, css, js, scripts } = req.body
            const html_script = scripts.html
            const css_stylesheet = scripts.css
            const js_script = scripts.js
            const { html_tag_class, head_tag } = html_script
            // Create Pen from variables
            //console.log(user_id)
            dbConn.update_pen([name, description, html, css, js, +pen_id])
                .then( () => {
                    // check to see if the request from the client contains any html settings content
                    if(html_tag_class || head_tag) {
                        //console.log('html class fired')
                        //Adding the content if it exists
                        dbConn.delete_html_scripts([pen_id])
                            .then(() => {
                                dbConn.post_html_scripts([pen_id, html_tag_class, head_tag])
                                    .catch( err => {
                                        console.error(err)
                                        res.sendStatus(500)
                                    })
                            })
                            .catch( err => {
                                console.error(err)
                                res.sendStatus(500)
                            })
                    }
                    // check to see if the request from the client contains any css settings content
                    if(css_stylesheet[0]) {
                        //Adding the content if it exists
                        dbConn.delete_css_stylesheet([pen_id])
                            .then( () => {
                                for(let i = 0; i < css_stylesheet.length; i++) {
                                    dbConn.post_css_stylesheet([pen_id, css_stylesheet[i]])
                                        .catch( err => {
                                            console.error(err)
                                            res.sendStatus(500)
                                        }) 
                                }
                            })
                            .catch(console.error)
                    }
                    // check to see if the request from the client contains any javascript settings content
                    if(js_script[0]) {

                        dbConn.delete_js_scripts([pen_id])
                            .then(() => {
                                //Adding the content if it exists
                                for(let i = 0; i < js_script.length; i++) {
                                    dbConn.post_js_scripts([pen_id, js_script[i]])
                                        .catch( err => {
                                            console.error(err)
                                            res.sendStatus(500)
                                        })
                                }
                            })
                            .catch(console.error)
                    }
                    //console.log('update')
                    res.sendStatus(201)
                })
                .catch( err => {
                    console.error(err)
                    res.sendStatus(500)
                })
        }
        else {
            res.sendStatus(403)
        }
    },
    deletePen(req, res) {
        const dbConn = req.app.get('db')
        const { userid: user_id } = req.session
        const { penId: pen_id } = req.params
        //console.log(pen_id)
        // dbConn.get_pen([pen_id])
        //     .then( response => {
        //         if( user_id === response[0].user_id) {
                    dbConn.delete_pen([pen_id])
                        .then( () => res.sendStatus(200))
                        .catch(console.error)
            //     }
            //     else {
            //         res.sendStatus(401)
            //     }
            // })
            // .catch(console.error)
    },
    getLikes(req,res) {
        req.app.get("db").get_num_likes(req.params.penId).then(response => {
            res.status(200).send(response);
        }).catch(console.error())
    },
    likePen(req,res) {
        req.app.get("db").post_like(req.params.pen_id, req.session.user_id).then(res.status(200)).catch(console.error);
    }
}