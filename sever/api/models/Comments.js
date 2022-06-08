"use strict";
const db = require("../db");

var Comments = {
  getCommentsById: function (details_product_id, callback) {
    let sql =
      "SELECT * from comments WHERE details_product_id = ? ORDER BY create_date DESC";
    return db.query(sql, [details_product_id], callback);
  },
  getAverageStarPoint: function (details_product_id, callback) {
    let sql =
      "SELECT AVG(star_point) as star_point FROM comments WHERE details_product_id = ?";
    return db.query(sql, [details_product_id], callback);
  },
  insertComments: function (data, callback) {
    let sql = "INSERT INTO comments SET ?";
    return db.query(sql, [data], callback);
  },
};

module.exports = Comments;
