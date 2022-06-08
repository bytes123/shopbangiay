"use strict";
const middlewareAuth = require("./middleware/middlewareAuth");
const middlewareBasket = require("./middleware/middlewareBasket");
var fs = require("fs");
const multer = require("multer");

let storageProduct = multer.diskStorage({
  destination: function (req, file, callback) {
    let dir = `../sever/public/resource/ProductImages/`;

    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

let storageBrand = multer.diskStorage({
  destination: function (req, file, callback) {
    let dir = `../sever/public/resource/BrandImages/`;

    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

let uploadProduct = multer({ storage: storageProduct });
let uploadBrand = multer({ storage: storageBrand });

module.exports = function (app) {
  let productsCtrl = require("./controllers/ProductsController");
  let categoryCrtl = require("./controllers/CategoryController");
  let brandsCtrl = require("./controllers/BrandsController");
  let filterCrtl = require("./controllers/FiltersController");
  let authCrtl = require("./controllers/AuthController");
  let userCrtl = require("./controllers/UserController");
  let basketCrtl = require("./controllers/BasketController");
  let paymentCrtl = require("./controllers/PaymentController");
  let commentsCrtl = require("./controllers/CommentsController");
  let detailsProductCrtl = require("./controllers/DetailsProductController");
  let billsCrtl = require("./controllers/BillsController");
  // API SẢN PHẨM
  app.route("/products").get(productsCtrl.get).post(productsCtrl.insertProduct);
  app
    .route("/details_product")
    .get(productsCtrl.getDetailsProduct)
    .post(uploadProduct.single("file"), productsCtrl.insertDetailsProduct);
  app.route("/search-products").post(productsCtrl.getProductsByName);
  app
    .route("/update-product")
    .post(uploadProduct.single("file"), productsCtrl.updateProduct);
  app.route("/delete-product").post(productsCtrl.deleteProduct);
  app.route("/delete-detail-product").post(productsCtrl.deleteDetailProduct);
  app.route("/update-storage").post(productsCtrl.updateStorage);

  // API CHI TIẾT SP
  app
    .route("/size")
    .get(detailsProductCrtl.getSize)
    .post(detailsProductCrtl.insertSize);
  app
    .route("/quality")
    .get(detailsProductCrtl.getQuality)
    .post(detailsProductCrtl.insertQuality);
  app
    .route("/colors")
    .get(detailsProductCrtl.getColors)
    .post(detailsProductCrtl.insertColor);

  // API HÓA ĐƠN
  app.route("/bill").get(productsCtrl.checkJwt);

  // app
  //   .route("/products/:productId")
  //   .get(productsCtrl.detail)
  //   .put(productsCtrl.update)
  //   .delete(productsCtrl.delete);

  //API DANH MỤCverifyToken
  app.route("/category").get(categoryCrtl.get);

  //API HÃNG
  app.route("/brands").get(brandsCtrl.get);
  app.route("/search-brands").post(brandsCtrl.getBrandByName);
  app
    .route("/insert-brand")
    .post(uploadBrand.single("file"), brandsCtrl.insertBrand);
  app
    .route("/update-brand")
    .post(uploadBrand.single("file"), brandsCtrl.updateBrand);
  app.route("/delete-brand").post(brandsCtrl.deleteBrand);

  //API LỌC GIÁ
  app.route("/filter/price").get(filterCrtl.getPrice);

  //API ĐĂNG NHẬP
  app.route("/login").post(authCrtl.login);

  //API ĐĂNG KÝ
  app.route("/register").post(authCrtl.register);

  //API USER
  app.route("/user").get(userCrtl.getAllUser);
  app.route("/user-byname").post(userCrtl.getUserByName);
  app.route("/update-role").post(userCrtl.updateRole);

  // API ĐỔI MK
  app.route("/check-password").post(authCrtl.checkPassWord);
  app.route("/change-password").post(userCrtl.updatePassword);
  app.route("/change-password-mail").post(userCrtl.updatePasswordByMail);
  app.route("/check-email").post(authCrtl.checkEmail);
  app.route("/request-reset").post(userCrtl.requestResetPassword);
  app.route("/get-reset-mail").post(userCrtl.getMail);

  //API XÓA USER
  app.route("/delete-user").post(userCrtl.deleteUser);

  //API REFRESH TOKEN
  app.route("/refresh").post(authCrtl.requestRefreshToken);

  //API ĐĂNG XUẤT
  app.route("/logout").post(middlewareAuth.verifyToken, authCrtl.userLogout);

  // API HANDLE BASKET
  app.route("/basket").post(basketCrtl.getBasket);

  app
    .route("/insert-basket")
    .post(middlewareBasket.checkDetailsProductId, basketCrtl.insertBasket);

  app
    .route("/insert-exist-basket")
    .post(
      middlewareBasket.checkDetailsProductId,
      basketCrtl.increaseExistBasket
    );

  app.route("/increase-basket").post(basketCrtl.increaseAmountBasket);

  app.route("/decrease-basket").post(basketCrtl.decreaseAmountBasket);

  app.route("/delete-basket").post(basketCrtl.deleteItemBasket);

  app.route("/delete-user-basket").post(basketCrtl.deleteUserBasket);

  app.route("/color-basket").post(basketCrtl.changeColorItemBasket);

  app.route("/call-momo").post(paymentCrtl.pay);

  // API BILLS
  app.route("/get-bills").get(billsCrtl.getBills);
  app.route("/get-bills-user").post(billsCrtl.getBillsUser);
  app.route("/get-detailbill-user").post(billsCrtl.getDetailBill);
  app.route("/insert-bills").post(billsCrtl.insertBills);
  app.route("/search-bills").post(billsCrtl.searchBills);
  app.route("/search-bills-user").post(billsCrtl.searchBillsUser);
  app.route("/confirm-bill").post(billsCrtl.confirmBill);
  app.route("/destroy-bill").post(billsCrtl.destroyBill);
  app.route("/delete-bill").post(billsCrtl.deleteBill);

  //API COMMENTS
  app.route("/get-comments").post(commentsCrtl.getCommentsById);
  app.route("/insert-comments").post(commentsCrtl.insertComments);
};
