UPDATE pens
SET 
    name = $1,
    html = $2,
    css =  $3,
    js =  $4
WHERE pen_id = $5;