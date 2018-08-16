module.exports = function restructureResponsePen(pen) {
    // restructure pen object for consistency
    pen.scripts = {
        html: {
            html_tag_class: pen.html_tag_class,
            head_tag: pen.head_tag
        },
        css: pen.css_stylesheet,
        js: pen.js_script
    }
    // remove unneeded refs
    delete pen.html_tag_class
    delete pen.head_tag
    delete pen.css_stylesheet
    delete pen.js_script
    
    return pen
}