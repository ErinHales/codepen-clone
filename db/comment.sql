INSERT INTO pen_comments
(user_id, pen_id, comment)
VALUES ($1, $2, $3)
RETURNING *;