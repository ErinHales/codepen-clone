SELECT pc.pen_id, pc.comment, u.name, u.img_url FROM pen_comments pc
JOIN users u ON u.id = pc.user_id
WHERE pc.pen_id = $1
ORDER BY pc.id DESC;