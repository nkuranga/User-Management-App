const Pool = require('pg').Pool

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "blog",
    port: 5432,
    password: "allin123"
})
module.exports = db