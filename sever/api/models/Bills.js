"use strict";
const db = require("../db");

var Bills = {
  getBills: function (callback) {
    let sql = "SELECT * from bills ORDER BY create_date DESC";
    return db.query(sql, callback);
  },
  getBillsUser: function (user_id, callback) {
    let sql = "SELECT * from bills WHERE user_id = ? ORDER BY create_date DESC";
    return db.query(sql, [user_id], callback);
  },
  getBillById: function (callback) {
    let sql = "SELECT * from bills ORDER BY create_date DESC LIMIT 1";
    return db.query(sql, callback);
  },
  getDetailBill: function (data, callback) {
    let sql =
      "SELECT * from details_bill,bills,details_product,products,colors,size,quality WHERE details_bill.bill_id = ? AND details_bill.bill_id = bills.bill_id AND details_bill.details_product_id = details_product.details_product_id AND products.product_id = details_product.product_id AND details_product.product_color = colors.color_id AND details_product.product_size = size.size_id AND details_product.product_quality = quality.quality_id GROUP BY details_product.details_product_id ORDER BY bills.create_date DESC";
    return db.query(sql, [data.bill_id], callback);
  },
  insertBills: function (data, callback) {
    let sql = "INSERT INTO bills SET ?";
    return db.query(sql, [data], callback);
  },
  insertDetailsBill: function (data, callback) {
    let sql = "INSERT INTO details_bill SET ?";
    return db.query(sql, [data], callback);
  },
  searchBills: function (bill_id, callback) {
    let sql = "SELECT * from bills WHERE bill_id LIKE ?";
    return db.query(sql, [bill_id], callback);
  },
  searchBillsUser: function (data, callback) {
    let sql = "SELECT * from bills WHERE bill_id LIKE ? AND user_id = ?";
    return db.query(sql, ["%" + data.bill_id + "%", data.user_id], callback);
  },
  confirmBill: function (data, callback) {
    let sql =
      "UPDATE bills SET bill_statement = 1 , confirm_date = ? WHERE bill_id = ?";
    return db.query(sql, [data.confirm_date, data.bill_id], callback);
  },
  destroyBill: function (data, callback) {
    let sql =
      "UPDATE bills SET bill_statement = 2 , cancel_date = ? WHERE bill_id = ?";
    return db.query(sql, [data.cancel_date, data.bill_id], callback);
  },
  deleteBill: function (bill_id, callback) {
    let sql = "DELETE FROM bills WHERE bill_id = ?";
    return db.query(sql, [bill_id], callback);
  },
};

module.exports = Bills;
