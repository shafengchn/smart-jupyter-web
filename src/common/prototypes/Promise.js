
Promise.prototype.finally = function (callback) {
    'use strict';
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback(value)),
        err => P.resolve(callback(err))
    );
};

/**
 * 执行resolve或reject之前调用回调函数
 * @param {回调函数} callback 
 */
 Promise.prototype.before = function (callback) {
    "use strict";
    return this.then(
      res => {
        callback(res);
        return this;
      },
      err => {
        callback(err);
        return this;
      }
    );
  };
  