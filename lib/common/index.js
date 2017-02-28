/**
 * Created by songjd on 2017/2/25.
 */
let path = require('path');
let crypto = require('crypto');
const config = require('./../../config');
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
  };

  static trim(str) {
    return str.replace('/^\s/|\s$/g','');
  }
}
module.exports = Common;