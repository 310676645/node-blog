/**
 * Created by songjd on 2017/2/26.
 */
let path = require('path');
let express = require('express');
let router = express.Router();
let category = require('./category');
let article = require('./article');
let db = require(path.join(LIB_PATH, 'db'));
router.use('/category', category);
router.use('/article', article);
module.exports = router;