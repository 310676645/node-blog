/**
 * Created by songjd on 2017/2/26.
 */
let Common = require('./../../../lib/common');
let Model = require('./../../../lib/model');
class ArticleModel extends Model {
  constructor() {
    super();
  }

  create(values = {}) {
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO article SET ?';
      values['article_create_time'] = Common.generateTimestamp();
      this.db.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
          return false;
        }
        if (results.affectedRows > 0) {
          resolve();
          return true;
        }
        reject('增加文章成功');
        return false;
      });
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      let sql = 'delete from article where `article_id` = ?';
      this.db.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
          return false;
        }
        if (results.affectedRows > 0) {
          resolve(results);
          return true
        }
        reject('文章删除失败');
        return false;
      });
    });
  }

  update(values) {
    return new Promise((resolve, reject) => {
      let sql = 'update article set `article_pid` = ?, `article_title` = ?, `article_desc` = ? where article_id = ?';
      this.db.query(sql, [values.article_pid || '', values.article_title || 0, values.article_desc | ''], (error, results) => {
        if (error) {
          reject(resolve);
          return false;
        }
        if (results.affectedRows > 0) {
          resolve();
          return true;
        }
        reject('更新文章失败');
        return false;
      });
    });
  }


  findAll() {
    return new Promise((resolve, reject) => {
      let sql = 'select * from article';
      this.db.query(sql, (error, result) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(result);
        return true;
      });
    });
  }

  findOne(id) {
    return new Promise((resolve, reject) => {
      let sql = 'select * from article where `category_id` = ?';
      this.db.query(sql, [id], (error, row) => {
        if (error) {
          reject(error);
          return false;
        }
        if (row.length <= 0) {
          reject('文章id错误');
          return false;
        }
        resolve(row[0]);
        return true;
      });
    });
  }

}

module.exports = ArticleModel;