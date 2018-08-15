INSERT INTO pens (user_id, name, forked, html, css, js)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING pen_id;