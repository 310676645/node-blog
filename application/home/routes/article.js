/**
 * Created by songjd on 2017/2/26.
 */
let path = require('path');
let express = require('express');
let router = express.Router();
let db = require(path.join(LIB_PATH, 'db'));
let Common = require(path.join(LIB_PATH, 'common'));
let articleModel = new (require('./../../common/model/ArticleModel'));
let Validator = require(path.join(LIB_PATH, 'validator'));
function validataFunc(body) {
  let validator = new Validator();
  validator.add(body.category_id || '', 'isNotEmpty', 'category_id不能为空');
  validator.add(body.article_title || '', 'isNotEmpty', 'article_title不能为空');
  return validator.start();
}

// 文章列表获取接口
router.get('/', (req, res, next) => {
  let page = req.query.page;
  let pageSize = req.query.page_size;
  articleModel.findAll(page, pageSize).then(data => {
    let total = data[0][0].total;
    res.json(Common.json({
      code: 0,
      data: {
        total,
        page_count: articleModel.Page.getCount(total, pageSize),
        list: data[1]
      },
      msg: '获取文章列表成功'
    }))
  }).catch(error => {
    res.json(Common.json({
      code: 1,
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

module.exports = router;
