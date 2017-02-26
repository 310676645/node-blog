/**
 * Created by songjd on 2017/2/26.
 */

let db = require('./../db/index');
class Model {
  constructor() {
    this.db = db;
  }
}
module.exports = Model;
