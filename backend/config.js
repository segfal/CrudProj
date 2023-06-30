const pg = require('pg');








const config = {
    'user' : 'postgres',
    'password' : 'postgres',
}

const pool = new pg.Pool(config);






module.exports = pool;
