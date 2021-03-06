SELECT 
    pens.pen_id, 
    pens.user_id,
    pens.name, 
    pens.description,
    pens.forked,
    pens.html,
    pens.css,
    pens.js,
    stats.views,
    stats.comments,
    stats.loves,
    users.name as username,
    users.id,
    users.img_url,
    html_scripts.html_tag_class,
    html_scripts.head_tag,
    ARRAY_AGG(css_stylesheets.stylesheet) as css_stylesheet,
    ARRAY_AGG(js_scripts.js_script) as js_script
    FROM pens
LEFT OUTER JOIN html_scripts
    ON pens.pen_id = html_scripts.pen_id
LEFT OUTER JOIN css_stylesheets
    ON pens.pen_id = css_stylesheets.pen_id
LEFT OUTER JOIN js_scripts
    ON pens.pen_id = js_scripts.pen_id
LEFT OUTER JOIN stats
    ON pens.pen_id = stats.pen_id
RIGHT OUTER JOIN users
    ON pens.user_id = users.id
WHERE
    pens.pen_id = $1
GROUP BY
    pens.pen_id,
    html_scripts.html_tag_class,
    stats.views,
    stats.comments,
    stats.loves,
    users.name,
    users.id,
    users.img_url,
    html_scripts.head_tag;