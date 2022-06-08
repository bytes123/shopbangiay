"use strict";
const db = require("../db");

var DetailsProduct = {
  getSize: function (callback) {
    let sql = "SELECT * from size";
    return db.query(sql, callback);
  },
  getQuality: function (callback) {
    let sql = "SELECT * from quality";
    return db.query(sql, callback);
  },
  getColors: function (callback) {
    let sql = "SELECT * from colors";
    return db.query(sql, callback);
  },
  insertSize: function (data, callback) {
    let sql = "INSERT INTO size SET ?";
    return db.query(sql, [data], callback);
  },
  insertQuality: function (data, callback) {
    let sql = "INSERT INTO quality SET ?";
    return db.query(sql, [data], callback);
  },
  insertColor: function (data, callback) {
    let sql = "INSERT INTO colors SET ?";
    return db.query(sql, [data], callback);
  },
};

module.exports = DetailsProduct;
