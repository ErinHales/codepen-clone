INSERT INTO pens (user_id, name, description, forked, html, css, js)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING pen_id;