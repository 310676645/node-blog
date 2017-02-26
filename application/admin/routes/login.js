let path = require('path');
let express = require('express');
let router = express.Router();
let db = require(path.join(LIB_PATH, 'db'));
let Common = require(path.join(LIB_PATH, 'common'));

router.post('/', function (req, res, next) {
  let body = req.body;
  if (!body.user_name || !body.user_pwd) {
    res.json(Common.json({
      msg: '用户名或密码不能为空!'
    }));
    return false;
  }
  let getUserInfo = () => {
    return new Promise((resolve, reject) => {
      let sql = 'select user_name,user_pwd,last_login from admin where `user_name` = ?';
      db.query(sql, [body.user_name], (error, row) => {
        if (error) reject(error);
        if (row.length > 0) resolve(row[0]);
        reject('账号不存在');
      });
    });
  };
  let updateTokenAndLastLogin = userInfo => {
    return new Promise((resolve, reject) => {
      let sql = 'update admin set user_token = ?, last_login = ? where user_name = ?';
      db.query(sql, [Common.generateAccountToken(), Common.generateTimestamp(), body.user_name], (error, results) => {
        if(error) reject(error);
        resolve(userInfo);
      });
    });
  };
  let login = userInfo => {
    return new Promise((resolve, reject) => {
      if (userInfo.user_pwd !== Common.md5(body.user_pwd)) reject('密码错误');
      delete userInfo.user_pwd;
      resolve(userInfo);
    });
  };
  getUserInfo().catch(error => {
    res.json(Common.json({
      code: 1,
      data: {},
      msg: error
    }));
    return false;
  }).then(userInfo => {
    return login(userInfo);
  }).catch(error => {
    res.json(Common.json({
      code: 0,
      data: {},
      msg: error
    }));
    return false;
  }).then(userInfo => {
    return updateTokenAndLastLogin(userInfo);
  }).then((userInfo) => {
    res.json(Common.json({
      code: 0,
      data: userInfo,
      msg: '登录成功'
    }));
    return true;
  }).catch((error) => {
    res.json(Common.json({
      msg: error
    }));
  });
});

module.exports = router;
