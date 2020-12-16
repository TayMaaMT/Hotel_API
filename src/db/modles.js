const db = require('./config');
require('dotenv').config();

const { CreatQuery, SelectQuerytable } = require('./CRUD');

const create = async(table, data) => {
    try {
        const colval = Object.keys(data).map(function(key) {
            return data[key];
        });
        const QueryUser = CreatQuery(table, data);
        const { rows } = await db.query(`${QueryUser}`, colval);
        return rows[0];
    } catch (err) {
        console.log(err);
        throw err.detail;
    }
}


const find = async(table, data) => {
    try {
        if (data) {
            const colval = Object.keys(data).map(function(key) {
                return data[key];
            });
            const SelectQuery = SelectQuerytable(table, data);
            const { rows } = await db.query(`${SelectQuery}`, colval);
            return rows;
        } else {
            
            const { rows } = await db.query(`select * from ${table}`);
            return rows;
        }


    } catch (err) {
        throw err;
    }

}


module.exports = {
    create,
    find,

}