SELECT 
    pens.pen_id, 
    pens.user_id,
    pens.name, 
    pens.forked,
    pens.html,
    pens.css,
    pens.js,
    html_scripts.html_tag_class,
    html_scripts.head_tag,
    ARRAY_AGG(css_stylesheets.stylesheet) as css_stylesheet,
    ARRAY_AGG(js_scripts.js_script) as js_script
    FROM pens
RIGHT OUTER JOIN html_scripts
    ON pens.pen_id = html_scripts.pen_id
RIGHT OUTER JOIN css_stylesheets
    ON pens.pen_id = css_stylesheets.pen_id
RIGHT OUTER JOIN js_scripts
    ON pens.pen_id = js_scripts.pen_id
WHERE
    pens.pen_id = $1
GROUP BY
    pens.pen_id,
    html_scripts.html_tag_class,
    html_scripts.head_tag;