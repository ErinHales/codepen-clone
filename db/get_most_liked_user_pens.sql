SELECT 
    pens.pen_id, 
    pens.user_id,
    pens.name,
    users.name as username,
    users.img_url,
    count(likes.pen_id) as likes,
    count(pen_comments.pen_id)as comments,
    count (views.pen_id)as views,
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
JOIN users
    ON pens.user_id = users.id
FULL JOIN likes
    ON pens.pen_id = likes.pen_id
FULL JOIN pen_comments
    ON pens.pen_id = pen_comments.pen_id
FULL JOIN views
    ON pens.pen_id = views.pen_id
WHERE 
    pens.user_id = $1
GROUP BY
    users.name,
    users.img_url,
    pens.pen_id,
    html_scripts.html_tag_class,
    html_scripts.head_tag
ORDER BY
    likes
    DESC;
