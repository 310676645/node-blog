/**
 * Created by songjd on 2017/2/26.
 */
let path = require('path');
let express = require('express');
let router = express.Router();
let login = require('./login');
let category = require('./category');
let db = require(path.join(LIB_PATH, 'db'));
let Common = require(path.join(LIB_PATH, 'common'));
router.use('/login', login);
router.use('/category', (req, res, next) => {
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
        code: 401,
        data: {},
        msg: 'user_token无效'
      }));
    } else {
      next();
    }
  });
}, category);
module.exports = router;