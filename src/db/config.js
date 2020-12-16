const Pool = require('pg').Pool
require('dotenv').config();
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        console.log(result.rows)
    })
})


module.exports = {
    query: (text, params) => pool.query(text, params),
}

// CREATE TABLE owner (
//     id serial PRIMARY KEY,
//     username VARCHAR ( 50 ) NOT NULL,
//     phone VARCHAR ( 50 ) ,
//     picture VARCHAR ( 255 ) ,
//     information text 
// );
// CREATE TABLE room (
//     id serial PRIMARY KEY,
//     owner_id INT ,
//     img1  VARCHAR ( 255 ) ,
//     img2  VARCHAR ( 255 ) ,
//     img3  VARCHAR ( 255 ) ,
//     img4  VARCHAR ( 255 ) ,
//     img5  VARCHAR ( 255 ) ,
//     description text ,
//     square INT,
//     bathroom VARCHAR ( 50 ),
//     bed VARCHAR ( 50 ),
//     price INT,
//     Seating_area VARCHAR ( 50 ),
//     internet Boolean,
//     available boolean,
//     review double precision	,
//     FOREIGN KEY (owner_id) REFERENCES owner(id)
// );