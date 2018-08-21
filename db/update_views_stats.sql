UPDATE stats
SET views = (
    SELECT views FROM stats
    WHERE pen_id = $1
) + 1
WHERE pen_id = $1;