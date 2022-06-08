import React, { useState, useEffect } from "react";
import DetailFilterItem from "./DetailFilterItem";
import { useStateValue } from "../StateProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useFilter from "./useFilter";

export default function Filter({ submitFilter }) {
  const [
    {
      phone_filters,
      laptop_filters,
      tablet_filers,
      watch_filter,
      headphone_filters,
      category_name,
    },
    dispatch,
  ] = useStateValue();

  const { filterValues, setNewFilterValues } = useFilter();
  const [currentIndex, setCurrentIndex] = useState();

  return (
    <div className="category_filter">
      <div className="filter_list">
        {/* {category_name == "phone" ? (
          <>
            {phone_filters.map((item, index) => (
              <li className="filter_item" key={index}>
                <DetailFilterItem
                  option={item}
                  index={index}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  category_name={category_name}
                  filterValues={filterValues}
                  onNewFilterValues={setNewFilterValues}
                />
              </li>
            ))}
            <button
              className="btn btn-primary"
              onClick={(e) => submitFilter(filterValues, e)}
            >
              Lọc
            </button>
          </>
        ) : (
          ""
        )} */}
        {category_name == "sneaker" ? (
          <>
            {phone_filters.map((item, index) => (
              <li className="filter_item" key={index}>
                <DetailFilterItem
                  option={item}
                  index={index}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  category_name={category_name}
                  filterValues={filterValues}
                  onNewFilterValues={setNewFilterValues}
                />
              </li>
            ))}
            <button
              className="btn btn-primary"
              onClick={(e) => submitFilter(filterValues, e)}
            >
              Lọc
            </button>
          </>
        ) : (
          ""
        )}
        {/* {category_name == "tablet"
          ? tablet_filers.map((item, index) => (
              <li
                className="filter_item"
                onClick={(e) => handleCurrentIndex(e, index)}
              >
                <DetailFilterItem key={index} textItem={item} index={index} />
                <div
                  className={`${
                    currentIndex == index ? "filter_bar active" : "filter_bar"
                  }`}
                >
                  asd
                </div>
              </li>
            ))
          : ""}
        {category_name == "watch"
          ? watch_filter.map((item, index) => (
              <li
                className="filter_item"
                onClick={(e) => handleCurrentIndex(e, index)}
              >
                <DetailFilterItem key={index} textItem={item} index={index} />
                <div
                  className={`${
                    currentIndex == index ? "filter_bar active" : "filter_bar"
                  }`}
                >
                  asd
                </div>
              </li>
            ))
          : ""}
        {category_name == "headphone"
          ? headphone_filters.map((item, index) => (
              <li
                className="filter_item"
                onClick={(e) => handleCurrentIndex(e, index)}
              >
                <DetailFilterItem key={index} textItem={item} index={index} />
                <div
                  className={`${
                    currentIndex == index ? "filter_bar active" : "filter_bar"
                  }`}
                >
                  asd
                </div>
              </li>
            ))
          : ""}{" "} */}
      </div>
    </div>
  );
}
