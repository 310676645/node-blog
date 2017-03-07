/**
 * Created by songjd on 2017/2/26.
 */

let db = require('./../db/index');
let Page = require('./../page');
class Model {
  constructor () {
    this.db = db;
    this.setPage();
  }
  setPage () {
    this.Page = Page;
  }
}
module.exports = Model;
