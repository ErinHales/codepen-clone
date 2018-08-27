SELECT profile_layout.pen_id, position, html, css, js
FROM profile_layout, pens
WHERE profile_layout.pen_id = pens.pen_id AND profile_layout.user_id = pens.user_id
ORDER BY position;