import React, { useEffect, useState } from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import QualityList from "../Partials/QualityList";
import { useLocation } from "react-router-dom";

export default function Product({
  id,
  title,
  amount,
  category,
  image,
  price,
  rating,
  product,
}) {
  const [
    { quality, details_product, formatMoney, cleanString, productImageUrl },
    dispatch,
  ] = useStateValue();
  const [activeProduct, setActiveProduct] = useState(0);
  const [qualityList, setQualityList] = useState([]);
  let location = useLocation();

  let miniList =
    details_product.length > 0
      ? details_product.filter(
          (detail) => detail.product_id == product.product_id
        )
      : [];

  useEffect(() => {
    // SET QUALITY LIST FOR PRODUCTS ITEM
    const uniqueQuality = [
      ...new Map(miniList.map((item) => [item["quality_id"], item])).values(),
    ];
    var toArray = Object.values(uniqueQuality);

    var sortedUniqueQuality = [...toArray]
      .sort((a, b) => a.quality_value - b.quality_value)
      .reverse();

    setQualityList(sortedUniqueQuality);
  }, [details_product, activeProduct, product]);

  const handleChangeActive = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveProduct(index);
  };

  return qualityList[activeProduct] &&
    qualityList[activeProduct].details_product_id ? (
    <div className="product col-lg-2 col-md-4 col-sm-12">
      <Link
        to={`/${category}/${cleanString(id)}/${
          qualityList[activeProduct]
            ? qualityList[activeProduct].details_product_id
            : ""
        }`}
      >
        <div className="product_wrapper">
          <img
            className="product_img"
            src={
              qualityList[activeProduct]
                ? productImageUrl(qualityList[activeProduct].product_image)
                : ""
            }
            alt=""
          />
          <div className="product_info">
            <p className="product_title">
              {qualityList[activeProduct]
                ? qualityList[activeProduct].category_name
                : ""}{" "}
              {title}
            </p>
            <QualityList
              qualityHeader={false}
              qualityList={qualityList}
              onActiveChange={handleChangeActive}
              activeItem={activeProduct}
            />
            <p className="product_price discount">
              <span>
                <strong>
                  {formatMoney(
                    qualityList[activeProduct]
                      ? qualityList[activeProduct].product_price
                      : ""
                  )}
                </strong>
                <sup>
                  <b>
                    <u>đ</u>
                  </b>
                </sup>
              </span>
              {qualityList[activeProduct].product_discount != 0 && (
                <div className="discount-percent">
                  -{qualityList[activeProduct].product_discount}%
                </div>
              )}
            </p>
            <p className="product_price ">
              <strong>
                {formatMoney(
                  qualityList[activeProduct]
                    ? qualityList[activeProduct].product_price -
                        (qualityList[activeProduct].product_price *
                          qualityList[activeProduct].product_discount) /
                          100
                    : ""
                )}
              </strong>
              <sup>
                <b>
                  <u>đ</u>
                </b>
              </sup>
            </p>
            <div className="product_rating">
              {Array(
                qualityList[activeProduct]
                  ? qualityList[activeProduct].product_star_point
                  : ""
              )
                .fill()
                .map((_, i) => (
                  <p key={i}>
                    <StarIcon />
                  </p>
                ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    ""
  );
}
