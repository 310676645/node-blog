/**
 * Created by songjd on 2017/2/26.
 */
let path = require('path');
let express = require('express');
let router = express.Router();
let db = require(path.join(LIB_PATH, 'db'));
let Common = require(path.join(LIB_PATH, 'common'));
let articleModel = new (require('./../model/ArticleModel'));
let Validator = require(path.join(LIB_PATH, 'validator'));
function validataFunc(body) {
  let validator = new Validator();
  validator.add(body.category_id || '', 'isNotEmpty', 'category_id不能为空');
  validator.add(body.article_title || '', 'isNotEmpty', 'article_title不能为空');
  return validator.start();
}

// 文章创建接口
router.post('/', (req, res, next) => {
  let body = req.body;
  let msg = validataFunc(body);
  if(msg) {
    res.json(Common.json({
      code: 0,
      msg
    }));
    return false;
  }
  articleModel.create(body).then(() => {
    res.json(Common.json({
      code: 0,
      msg: '创建成功'
    }));
  }).catch((error) => {
    res.json(Common.json({
      code: 1,
      msg: error
    }))
  });
});

// 文章列表获取接口
router.get('/', (req, res, next) => {
  articleModel.findAll().then(data => {
    res.json(Common.json({
      code: 0,
      data: data,
      msg: '获取文章列表成功'
    }))
  }).catch(error => {
    res.json(Common.json({
      code: 0,
      msg: error
    }))
  })
});

// 根据id获取文章接口

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  articleModel.findOne(id).then(data => {
    res.json(Common.json({
      code: 0,
      data: data,
      msg: '获取文章成功'
    }))
  }).catch(error => {
    res.json(Common.json({
      code: 0,
      msg: error
    }))
  })
});

// 文章更新接口
router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let body = req.body;
  let msg = validataFunc(body);
  if(msg) {
    res.json(Common.json({
      code: 0,
      msg
    }));
    return false;
  }
  articleModel.update(body, id).then((data) => {
    res.json(Common.json({
      msg: '更新文章成功',
      code: 0,
      data
    }));
  }).catch(error => {
      res.json(Common.json({
        code: 1,
        msg: error
      }));
  });
});

// 文章删除接口
router.delete('/:id', (req, res, next) => {
  let params = req.params;
  if(!params.id && !params.id !== 0) {
    res.json(Common.json({
      code: 1,
      msg: 'article_id不能为空'
    }));
    return false;
  }
  articleModel.remove(params.id).then(data => {
    res.json(Common.json({
      code: 0,
      msg: '文章删除成功',
      data
    }))
  }).catch(error => {
    res.json(Common.json({
      code: 1,
      msg: error
    }))
  });
})
module.exports = router;
