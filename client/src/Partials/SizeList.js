import React from "react";
import { Link } from "react-router-dom";
import "./ColorList.css";

function ColorList({ sizeList, activeItem, onActiveChange, isLink }) {
  return (
    <div className="product_colors">
      <h4 className="product_colors-header">SIZE</h4>
      <div className="product_colors-list">
        {sizeList && sizeList.length > 0
          ? sizeList.map((item, index) => {
              return isLink ? (
                <Link
                  key={index}
                  className={
                    index == activeItem
                      ? "product_colors-item active"
                      : "product_colors-item"
                  }
                  to={`/phone/${item.product_id}/${item.details_product_id}`}
                >
                  {item.size_value}
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
                  {item.size_value}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default ColorList;
