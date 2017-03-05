/**
 * Created by songjd on 2017/2/26.
 */
let path = require('path');
let express = require('express');
let router = express.Router();
let login = require('./login');
let category = require('./category');
let article = require('./article');
let db = require(path.join(LIB_PATH, 'db'));
let Common = require(path.join(LIB_PATH, 'common'));
router.use('/login', login);
router.use('/category', (req, res, next) => {
  Common.checkAdminToken(req, res, next);
}, category);
router.use('/article', (req, res, next) => {
  Common.checkAdminToken(req, res, next);
}, article);
module.exports = router;