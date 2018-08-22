DELETE FROM likes
WHERE pen_id = $2 AND user_id = $1;

SELECT count(*) FROM likes
WHERE pen_id = $2;