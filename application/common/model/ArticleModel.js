/**
 * Created by songjd on 2017/2/26.
 */
let Common = require('./../../../lib/common/index');
let Model = require('./../../../lib/model/index');
class ArticleModel extends Model {
  constructor() {
    super();
  }

  create(values = {}) {
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO article SET ?';
      values['article_create_time'] = Common.generateTimestamp();
      let {article_title, article_desc, article_content, article_create_time, category_id} = values
      this.db.query(sql, {
        article_title,
        article_desc,
        article_content,
        article_create_time,
        category_id
      }, (error, results) => {
        if (error) {
          reject(this.db.showError(error));
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
          reject(this.db.showError(error));
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

  update(values, article_id) {
    return new Promise((resolve, reject) => {
      let sql = 'update article set `category_id` = ?, `article_title` = ?, `article_desc` = ?, `article_content` = ? where `article_id` = ?';
      let {article_title, article_desc, article_content, category_id} = values
      this.db.query(sql, [
        category_id,
        article_title,
        article_desc,
        article_content,
        article_id
      ], (error, results) => {
        if (error) {
          reject(error);
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


  findAll(currentPage, pageSize) {
    let page = new this.Page({
      page: currentPage,
      pageSize
    });
    let {m, n} = page.getPage();
    return new Promise((resolve, reject) => {
      let selectTotalCountSql = 'select count(*) as total from article;';
      let selectDataSql = `select * from article inner join category where article.category_id = category.category_id order by article_create_time desc limit ${m},${n}`;
      this.db.query(selectTotalCountSql +　selectDataSql, (error, result) => {
        if (error) {
          reject(this.db.showError(error));
          return false;
        }
        resolve(result);
        return true;
      });
    });
  }

  findOne(id) {
    return new Promise((resolve, reject) => {
      let sql = 'select * from article inner join category where `article_id` = ? and article.category_id = category.category_id';
      this.db.query(sql, [id], (error, row) => {
        if (error) {
          reject(this.db.showError(error));
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