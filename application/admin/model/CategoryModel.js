/**
 * Created by songjd on 2017/2/26.
 */
let Model = require('./../../../lib/model');
class CategoryModel extends Model {
  constructor() {
    super();
  }

  create(values = {}) {
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO category SET ?';
      this.db.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
          return false;
        }
        if (results.affectedRows > 0) {
          resolve();
          return true;
        }
        reject('增加分类失败');
        return false;
      });
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      let sql = 'delete from category where `category_id` = ?';
      this.db.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
          return false;
        }
        if (results.affectedRows > 0) {
          resolve(results);
          return true
        }
        reject('删除失败');
        return false;
      });
    });
  }

  update(values) {
    return new Promise((resolve, reject) => {
      let sql = 'update category set `category_pid` = ?, category_name = ? where category_id = ?';
      this.db.query(sql, values, (error, results) => {
        if (error) {
          reject(resolve);
          return false;
        }
        if (results.affectedRows > 0) {
          resolve();
          return true;
        }
        reject('更新失败');
        return false;
      });
    });
  }


  findAll() {
    return new Promise((resolve, reject) => {
      let sql = 'select * from category';
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
      let sql = 'select category_id, category_name from category where `category_id` = ?';
      this.db.query(sql, [id], (error, row) => {
        if (error) {
          reject(error);
          return false;
        }
        if (row.length <= 0) {
          reject('分类id错误');
          return false;
        }
        resolve(row);
        return true;
      });
    });
  }

}

module.exports = CategoryModel;