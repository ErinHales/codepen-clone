UPDATE pens
SET 
    name = $1,
    description = $2,
    html = $3,
    css =  $4,
    js =  $5
WHERE pen_id = $6;