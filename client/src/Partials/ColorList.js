import React from "react";
import { Link } from "react-router-dom";
import "./ColorList.css";

function ColorList({ colorList, activeItem, onActiveChange, isLink }) {
  return (
    <div className="product_colors">
      <h4 className="product_colors-header">Màu sắc</h4>
      <div className="product_colors-list">
        {colorList.length > 0
          ? colorList.map((item, index) => {
              return isLink ? (
                <Link
                  key={index}
                  className={
                    item.color_id == activeItem
                      ? "product_colors-item active"
                      : "product_colors-item"
                  }
                  to={`/phone/${item.product_id}/${item.details_product_id}`}
                >
                  {item.color_value}
                </Link>
              ) : (
                <div
                  key={index}
                  className={
                    index == activeItem
                      ? "product_colors-item active"
                      : "product_colors-item"
                  }
                  onClick={(e) => onActiveChange(e, index)}
                >
                  {item.color_value}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default ColorList;
