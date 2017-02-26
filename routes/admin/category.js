/**
 * Created by songjd on 2017/2/26.
 */
let path = require('path');
let express = require('express');
let router = express.Router();
let db = require(path.join(LIB_PATH, 'db'));
let Common = require(path.join(LIB_PATH, 'common'));

router.post('/', function (req, res, next) {
  let body = req.body;
  if (!body.category_name) {
    res.json(Common.json({
      code: 1,
      msg: 'category_name不能为空'
    }));
    return false;
  }
  let sql = 'INSERT INTO category SET ?';
  let values = {
    category_name: body.category_name,
  };
  body.category_pid &&　(values['category_pid'] = body.category_pid);
  db.query(sql, values, (error, results) => {
    if (error) {
      res.json(Common.json({
        code: 1,
        msg: error
      }));
      return false;
    }
    if (results.affectedRows > 0) {
      res.json(Common.json({
        code: 0,
        msg: '增加分类成功'
      }));
      return true;
    } else {
      res.json(Common.json({
        code: 1,
        msg: '增加分类失败'
      }));
      return false;
    }
  });
});
module.exports = router;
