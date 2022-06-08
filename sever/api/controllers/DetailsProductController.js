const DetailsProduct = require("../models/DetailsProduct");
module.exports = {
  getSize(req, res) {
    DetailsProduct.getSize((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getQuality(req, res) {
    DetailsProduct.getQuality((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getColors(req, res) {
    DetailsProduct.getColors((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  insertSize(req, res) {
    const data = req.body;
    DetailsProduct.insertSize(data, (err, response) => {
      if (err) throw err;
      return res.json("Thêm size thành công");
    });
  },
  insertQuality(req, res) {
    const data = req.body;
    DetailsProduct.insertQuality(data, (err, response) => {
      if (err) throw err;
      return res.json("Thêm chất lượng thành công");
    });
  },
  insertColor(req, res) {
    const data = req.body;
    DetailsProduct.insertColor(data, (err, response) => {
      if (err) throw err;
      return res.json("Thêm màu thành công");
    });
  },
};
