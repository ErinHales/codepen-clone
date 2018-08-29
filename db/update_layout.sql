UPDATE profile_layout
SET pen_id = $1
WHERE position = $2 AND user_id = $3;