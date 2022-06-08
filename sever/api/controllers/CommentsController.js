const Comments = require("../models/Comments");
const Products = require("../models/Products");

module.exports = {
  insertComments(req, res) {
    const details_product_id = req.body.data.details_product_id;

    const data = req.body.data;
    data.create_date = new Date();

    Comments.insertComments(data, (err, response) => {
      if (err) throw err;
      Comments.getAverageStarPoint(details_product_id, (err, response) => {
        if (err) throw err;
        const star_point = JSON.stringify(response[0].star_point);
        Products.updateStarPoint(
          star_point,
          details_product_id,
          (err, response) => {
            if (err) throw err;
            return res.json("Đánh giá thành công");
          }
        );
      });
    });
  },
  getCommentsById(req, res) {
    const details_product_id = req.body.details_product_id;
    Comments.getCommentsById(details_product_id, (err, response) => {
      if (err) throw err;
      return res.json(response);
    });
  },
};
