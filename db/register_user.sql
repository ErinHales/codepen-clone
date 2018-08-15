INSERT INTO users (name, bcrypt_password, username, email)
VALUES($1, $2, $3, $4)
returning *;