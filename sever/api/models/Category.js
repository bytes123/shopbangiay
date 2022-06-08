"use strict";
const db = require("./../db");

var Category = {
  getAllCategory: function (callback) {
    let sql = "SELECT * from category";
    return db.query(sql, callback);
  },
};

module.exports = Category;
