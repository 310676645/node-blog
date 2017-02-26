/**
 * Created by songjd on 2017/2/26.
 */
let path = require('path');
let express = require('express');
let router = express.Router();
let db = require(path.join(LIB_PATH, 'db'));
let Common = require(path.join(LIB_PATH, 'common'));
let categoryModel = new (require('./../model/CategoryModel'));

// 分类创建接口
router.post('/', (req, res, next) => {
  let body = req.body;
  if (!body.category_name) {
    res.json(Common.json({
      code: 1,
      msg: 'category_name不能为空'
    }));
    return false;
  }
  let values = {
    category_name: body.category_name,
  };
  body.category_pid && (values['category_pid'] = body.category_pid);
  categoryModel.create(values).then(() => {
    res.json(Common.json({
      code: 0,
      msg: '增加分类成功'
    }));
  }).catch(error => {
    res.json(Common.json({
      code: 1,
      msg: error
    }));
  });
});

// 分类获取接口
router.get('/', (req, res, next) => {
  categoryModel.findAll().then(results => {
    res.json(Common.json({
      code: 0,
      data: results,
      msg: '获取分类成功'
    }));
  }).catch(error => {
    res.json(Common.json({
      code: 1,
      msg: error
    }));
  });
});

// 分类删除接口
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  categoryModel.findOne(id).catch((error) => {
    res.json(Common.json({
      code: 1,
      msg: error
    }));
  }).then(() => {
    return categoryModel.remove(id);
  }).then(() => {
    res.json(Common.json({
      code: 0,
      msg: '删除成功'
    }));
  }).catch(error => {
    res.json(Common.json({
      code: 1,
      msg: error
    }));
  });
});

// 分类更新接口
router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  categoryModel.update([req.body.category_pid, req.body.category_name, id]).then(() => {
    res.json(Common.json({
      code: 0,
      msg: '分类更新成功'
    }));
  }).catch(error => {
    res.json(Common.json({
      code: 1,
      msg: error
    }));
  });
});
module.exports = router;
