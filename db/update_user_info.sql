UPDATE user_info
SET location = $2, bio = $3, link1 = $4, link2 = $5, link3 = $6, for_hire = $7
WHERE user_id = $1;