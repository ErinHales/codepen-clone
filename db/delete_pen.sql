DELETE FROM stats
WHERE pen_id = $1;
DELETE FROM css_stylesheets
WHERE pen_id = $1;
DELETE FROM js_scripts
WHERE pen_id = $1;
DELETE FROM html_scripts
WHERE pen_id = $1;
DELETE FROM likes
WHERE pen_id = $1;
DELETE FROM views
WHERE pen_id = $1;
DELETE FROM pen_comments
WHERE pen_id = $1;
DELETE FROM pens
WHERE pen_id = $1;