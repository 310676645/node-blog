/**
 * Created by songjd on 2017/3/7.
 */

class Page {
  constructor (options = {}) {
    let defaultOptions = {
      page: 1,
      pageSize: 20,
      total: 1
    }
    options = Object.assign({}, defaultOptions, options);
    this.setOptions(options);
    this.setPage(options.page);
    this.setPageSize(options.pageSize);
  }
  setOptions (options) {
    this.options = options;
  }
  setPageSize (size) {
    this.pageSize = size;
  }
  setPage (page) {
    this.page = page;
  }
  static getCount (total, pageSize) {
    return Math.ceil(total / pageSize);
  }
  getPage () {
    let m = 0;
    let page = this.page;
    if (this.page === 1) {
      m = 0;
    } else {
      m = (page - 1) * this.pageSize;
    }
    let n = Number(this.pageSize);
    return {
      m,
      n
    }
  }
}

module.exports = Page;