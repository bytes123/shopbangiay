import React from "react";
import "./QualityList.css";
import { Link } from "react-router-dom";
function QualityList({
  qualityHeader,
  qualityList,
  activeItem,
  onActiveChange,
  isLink,
}) {
  return (
    <div className="product_capacity">
      {qualityHeader && <h4 className="product_capacity-header">Chất lượng</h4>}
      <div className="product_capacity-list">
        {qualityList.length > 0
          ? qualityList.map((item, index) => {
              return isLink ? (
                <Link
                  key={index}
                  className={
                    index == activeItem
                      ? "product_capacity-item active"
                      : "product_capacity-item"
                  }
                  to={`/phone/${item.product_id}/${item.details_product_id}`}
                >
                  {item.quality_value}
                </Link>
              ) : (
                <div
                  key={index}
                  className={
                    index == activeItem
                      ? "product_capacity-item active"
                      : "product_capacity-item"
                  }
                  onClick={(e) => onActiveChange(e, index)}
                >
                  {item.quality_value}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default QualityList;
