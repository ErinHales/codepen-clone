INSERT INTO likes
(user_id, pen_id)
VALUES ($1, $2);

SELECT count(*) FROM likes
WHERE pen_id = $2;