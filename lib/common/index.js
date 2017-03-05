/**
 * Created by songjd on 2017/2/25.
 */
let path = require('path');
let crypto = require('crypto');
const config = require('./../../config');
let db = require(path.join(LIB_PATH, 'db'));
class Common {
  static json(data = {}) {
    data = Object.assign({
      code: 1,
      data: {},
      msg: ''
    }, data);
    return {
      code: data.code,
      data: data.data,
      msg: data.msg
    }
  }

  static generateTimestamp() {
    return Number((Date.now() / 1000).toFixed(0));
  }

  static generateAccountToken(userName) {
    return this.md5(userName + this.generateTimestamp().toString(36) + Math.random().toString(36).substr(2));
  }

  static md5(text) {
    return crypto.createHash('md5').update(config.prefix + text, 'utf-8').digest('hex');
  }

  static trim(str = '') {
    return str.toString().replace('/^\s/|\s$/g','');
  }

  static checkAdminToken(req, res, next) {
    let userToken = req.body.user_token || req.query.user_token;
    if(!userToken) {
      res.json({
        code: 1,
        data: {},
        msg: 'user_token不能为空'
      });
      return false;
    }
    let sql = 'select user_name, user_token from admin where user_token = ?';
    db.query(sql, [userToken], (error, row) => {
      if (error) {
        res.json(Common.json({
          code: 1,
          data: {},
          msg: error
        }));
      }
      if (row.length <= 0) {
        res.json(Common.json({
          code: 100001,
          data: {},
          msg: 'user_token无效'
        }));
      } else {
        next();
      }
    });
  }
}
module.exports = Common;