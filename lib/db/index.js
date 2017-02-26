/**
 * Created by songjd on 2017/2/25.
 */

let config = require('./config');
let mysql = require('mysql');
let db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  charset: 'utf8_general_ci'
});
db.connect();
module.exports = db;