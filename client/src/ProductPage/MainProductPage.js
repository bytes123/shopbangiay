import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import StarPoints from "../StarPoints";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import QualityList from "../Partials/QualityList";
import ColorList from "../Partials/ColorList";
import SizeList from "../Partials/SizeList";
import Comment from "./Comment/Comment";
import MainProductInfo from "./MainProductInfo";

import Cookies from "js-cookie";
import "./MainProductPage.css";
import Toast from "../toast/Toast";

export default function MainProductPage() {
  const [
    {
      details_product,
      category_name,
      product_category,
      formatMoney,
      basket,
      isLogined,
      loginedUser,
      comments,
      productImageUrl,
      loginedBasket,
    },
    dispatch,
  ] = useStateValue();
  const { error, success } = Toast;
  const axios = require("axios");
  let params = useParams();
  let location = useLocation();
  let address = "ProductPage";

  // let product = products.filter(
  //   (item) => cleanString(item.product_name) == params.product_name
  // );
  const [amount, setAmount] = useState(1);
  const [category, setCategory] = useState("1");
  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [qualityList, setQualityList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [activeQualityIndex, setActiveQualityIndex] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleCloseLoading = () => {
    setLoading(false);
  };

  const handleOpenLoading = () => {
    setLoading(true);
  };

  const handleChangeActive = () => {};

  useEffect(() => {
    console.log(loginedUser);
  }, [loginedUser]);

  const decreseaAmount = () => {
    setAmount(amount - 1);
  };

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  async function getDetailsProduct() {
    try {
      const response = await axios.get("http://localhost:5000/details_product");
      dispatch({
        type: "GET_DETAILS_PRODUCT",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function insertLoginedBasket(user_id, details_product_id, amount) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/insert-basket",
        data: {
          user_id: user_id,
          details_product_id: details_product_id,
          amount: amount,
        },
      });
      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_LOGINED_BASKET",
          payload: response.data,
        });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function insertLoginedExistBasket(user_id, details_product_id, amount) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/insert-exist-basket",
        data: {
          user_id: user_id,
          details_product_id: details_product_id,
          amount: amount,
        },
      });
      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_LOGINED_BASKET",
          payload: response.data,
        });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  async function updateStorage(amount, details_product_id) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/update-storage",
        data: {
          product_storage: amount,
          details_product_id: details_product_id,
        },
      });
      if (response.data) {
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  }

  const addToBasket = async (user_id, details_product_id) => {
    if (product && product.product_storage > 0) {
      if (amount <= product.product_storage) {
        if (!isLogined) {
          setLoading(true);
          dispatch({
            type: "ADD_TO_BASKET",
            payload: {
              product: { ...product, basket_amount: 1 },
            },
          });
          await timeout(1000);
          getDetailsProduct();
          setLoading(false);
          success("Thêm giỏ hàng thành công");
        } else {
          setLoading(true);
          if (
            loginedBasket.some(
              (item) => item.details_product_id == details_product_id
            )
          ) {
            insertLoginedExistBasket(user_id, details_product_id, amount);
          } else {
            insertLoginedBasket(user_id, details_product_id, amount);
          }
          await timeout(1000);
          getDetailsProduct();
          setLoading(false);
          success("Thêm giỏ hàng thành công");
        }
      } else {
        error("Vượt quá số lượng sản phẩm có sẵn !");
      }
    } else {
      error("Hết hàng rồi :(");
    }
  };

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    console.log(basket);
  }, [basket]);

  useEffect(() => {
    if (details_product.length > 0) {
      setProduct(
        ...details_product.filter(
          (item) => item.details_product_id == params.detail_id
        )
      );
    }
  }, [details_product, location.pathname]);

  useEffect(() => {
    let categoryName = product_category
      .filter((item) => item.category_id == params.category_name)
      .map((item) => item.category_name);
    setCategory(...categoryName);
  }, [product_category]);

  useEffect(() => {
    if (typeof product == "object") {
      setBrand(product.brand_id);

      // SET Quality SORTED LIST
      let miniList =
        details_product.length > 0
          ? details_product.filter(
              (detail) => detail.product_id == product.product_id
            )
          : [];

      const uniqueQuality = [
        ...new Map(miniList.map((item) => [item["quality_id"], item])).values(),
      ];

      var qualityList = uniqueQuality.sort(
        (a, b) => a.quality_value - b.quality_value
      );

      setQualityList(qualityList);

      // SET SIZE LIST

      let size_list = miniList
        .filter((item) => item.quality_id == product.quality_id)
        .reverse();

      const uniqueSize = [
        ...new Map(size_list.map((item) => [item["size_id"], item])).values(),
      ];

      setSizeList(uniqueSize);

      // SET COLOR LIST
      let color_list = miniList
        .filter((item) => item.quality_id == product.quality_id)
        .reverse();

      const uniqueColor = [
        ...new Map(color_list.map((item) => [item["color_id"], item])).values(),
      ];

      setColorList(uniqueColor);

      // SET INDEX ACTIVE Quality LIST

      qualityList.forEach((item, index) => {
        if (item.details_product_id == params.detail_id) {
          setActiveQualityIndex(index);
        }
      });

      // SET INDEX ACTIVE Size LIST

      sizeList.forEach((item, index) => {
        if (item.details_product_id == params.detail_id) {
          setActiveSizeIndex(index);
        }
      });

      // SET INDEX ACTIVE COLOR LIST

      color_list.forEach((item, index) => {
        if (item.details_product_id == params.detail_id) {
          setActiveColorIndex(item.color_id);
        }
      });
    }
  }, [product]);

  useEffect(() => {
    console.log(qualityList);
  }, [sizeList]);

  useEffect(() => {
    dispatch({
      type: "GET_CATEGORY_NAME",
      payload: params.category_name,
    });
  }, [location.pathname]);

  return (
    <div className="product_main-wrapper">
      <div className="container">
        <div className="product_main-navigate">
          <Link to={`/category/${category_name}`}>{category ?? ""}</Link>
          <span className="product_main-navigate-icon">{`>`}</span>
          <Link to={`/category/${category_name}/${brand}`}>
            {category ?? ""}{" "}
            {product && product.product_name ? product.product_name : ""}{" "}
          </Link>
        </div>
        <div className="product_main-content">
          <div className="product_main-content-top">
            <div className="product_main-top-left">
              <div className="product_main-content-title">
                <h2 className="product_title">
                  {category ?? ""}{" "}
                  {product && product.product_name ? product.product_name : ""}{" "}
                  {product && product.quality_value
                    ? product.quality_value
                    : ""}
                </h2>
              </div>
            </div>
            <div className="product_main-content-stars product_rating">
              <StarPoints stars={product.product_star_point ?? 5} />
            </div>
            <div className="product_main-content-rates">
              <a href="">{comments.length} đánh giá</a>
            </div>
            {/* <div className="product_main-content-comparasion">
              <AddCircleOutlineIcon />
              <p>So sánh</p>
            </div> */}
          </div>
          <div className="product_main-content-bottom">
            <div className="main_content-bottom-left">
              <div className="product_main-image">
                <img
                  src={
                    product && product.product_image
                      ? productImageUrl(product.product_image)
                      : ""
                  }
                  alt=""
                />
              </div>
              <MainProductInfo product={product} />
              <Comment product={product} />
            </div>
            <div className="main_content-bottom-right">
              <div className="main_content-price">
                {product &&
                product.product_price &&
                product.product_discount != 0 ? (
                  <p className="product_price discount">
                    <h4 className="main_content-price-header">Giá gốc</h4>
                    <div>
                      <span>
                        {formatMoney(product.product_price)}
                        <sup>
                          <span className="unit-price">đ</span>
                        </sup>
                      </span>

                      <div className="discount-percent">
                        -{product.product_discount}%
                      </div>
                    </div>
                  </p>
                ) : (
                  ""
                )}
                {product &&
                product.product_price &&
                product.product_discount != 0 ? (
                  <p className="product_price">
                    <h4 className="main_content-price-header">Giá giảm</h4>
                    <div>
                      {formatMoney(
                        product.product_price -
                          (product.product_price * product.product_discount) /
                            100
                      )}
                      <sup>
                        <span className="unit-price">đ</span>
                      </sup>
                    </div>
                  </p>
                ) : (
                  <p className="product_price">
                    <h4 className="main_content-price-header">Giá</h4>
                    <div>
                      {formatMoney(product.product_price)}
                      <sup>
                        <span className="unit-price">đ</span>
                      </sup>
                    </div>
                  </p>
                )}
              </div>

              <QualityList
                qualityHeader={true}
                qualityList={qualityList}
                onActiveChange={handleChangeActive}
                activeItem={activeQualityIndex}
                isLink={true}
              />
              <ColorList
                colorList={colorList}
                onActiveChange={handleChangeActive}
                activeItem={activeColorIndex}
                isLink={true}
              />
              <SizeList
                sizeList={sizeList}
                onActiveChange={handleChangeActive}
                activeItem={activeSizeIndex}
                isLink={true}
              />
              <div className="main_content-quantity">
                <h4 className="main_content-quantity-header">
                  Số lượng sản phẩm
                </h4>
                <span>{product.product_storage} sản phẩm có sẵn</span>
              </div>
              <div className="main_content-gift">
                <div className="gift_wrapper">
                  <h2 className="gift_title">Nhận ngay khuyến mại đặc biệt</h2>
                  <div className="gifts">
                    <ul className="gift_list">
                      <li className="gift_item">
                        <div className="gift_icon">
                          <CheckCircleIcon />
                        </div>
                        <span className="gift_value">Free ship</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="product_info-quantity-wrapper">
                <h4 className="product_info-quantity-header">Chọn số lượng</h4>
                <div className="product_info-quantity">
                  <span
                    className={`${
                      amount > 1
                        ? "product_info-quantity-minus active"
                        : "product_info-quantity-minus"
                    }`}
                    onClick={() => amount > 1 && decreseaAmount()}
                  >
                    -
                  </span>
                  <input type="number" min="1" value={amount} />
                  <span
                    className="product_info-quantity-plus active"
                    onClick={increaseAmount}
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="main_content-button-buy">
                <button
                  className="main_content_buy-submit"
                  onClick={() =>
                    addToBasket(loginedUser.user_id, product.details_product_id)
                  }
                >
                  Thêm vào giỏ hàng
                </button>
              </div>

              <div className="main_content-configation">
                <h2 className="product_configation-title">
                  {product && product.product_name
                    ? `Cấu hình ${product.category_name} ${product.product_name}`
                    : ""}
                </h2>
                <ul className="product_configation-list">
                  {product && product.size_value ? (
                    <li className="product_configation-item">
                      <h4 className="product_detail-title">SIZE:</h4>
                      <span className="product_detail-item">
                        {product.size_value}
                      </span>
                    </li>
                  ) : (
                    ""
                  )}
                  {product && product.quality_value ? (
                    <li className="product_configation-item">
                      <h4 className="product_detail-title">Chất lượng:</h4>
                      <span className="product_detail-item">
                        {product.quality_value}
                      </span>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
