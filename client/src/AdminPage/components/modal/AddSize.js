// 1. OPTIMIZE FETCH DATA

import React, { useState, useEffect } from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useStateValue } from "../../../StateProvider";
import DropDown from "../dropdown/DropDown";
import "./modal.scss";
import Toast from "../../../toast/Toast";

function AddSize() {
  const [{ details_product, product_category, brands }, dispatch] =
    useStateValue();
  const [categoryList, setCategoryList] = useState();
  const [brandList, setBrandList] = useState();
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [errors, setErrors] = useState();
  const axios = require("axios");
  const { success } = Toast;

  // SET DEFAULT CATEGORY LIST AND SELECTED CATEOGRY FOR ADD FORM
  useEffect(() => {
    if (product_category) {
      const data = product_category.map((item, index) => {
        return {
          id: item.category_id,
          label: item.category_name,
        };
      });

      setSelectedCategory(data[0]);

      setCategoryList(data);
    }
  }, [product_category]);

  // 1. -> NEED OPTIMIZE----------------------------------------------
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

  async function getSize() {
    try {
      const response = await axios.get("http://localhost:5000/size");

      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_SIZE",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  // ----------------------------------------------------------------

  // SEND DATA TO SERVER
  async function insertSizeProduct(data) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/size",
        data: data,
      });

      if (response.data) {
        getSize();
        getDetailsProduct();
        success(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // SUBMIT FORM
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedCategory && !selectedCategory.id) {
      return;
    }
    if (selectedTitle.trim().length == 0) {
      setErrors({ ...errors, title: "Vui lòng nhập size" });
    } else {
      const data = {
        size_id:
          "size" +
          selectedTitle.trim() +
          `-${selectedCategory.id}-` +
          Date.now(),
        size_value: selectedTitle,
        category_id: selectedCategory.id,
      };
      insertSizeProduct(data);
    }
  };

  // CHANGE SELECTED TITLE

  const handleChangeTitle = (event) => {
    setErrors({});
    setSelectedTitle(event.target.value);
  };

  return (
    <div className="modal_product-add modal_form" style={{ overflow: "auto" }}>
      <div className="title">
        <AddBusinessIcon className="mb-2 cl-red" />
        <p>THÊM Size</p>
      </div>
      <form enctype="multipart/form-data" className="modal_product-add-form">
        <div className="product_category-add my-2">
          <label htmlFor="">Chọn danh mục</label>
          <br />
          <DropDown
            data={categoryList}
            selectedItem={selectedCategory}
            onSelectedItem={setSelectedCategory}
          />
        </div>

        <div className="product_name-add my-2">
          <label htmlFor="">Size</label>
          <br />
          <input
            type="number"
            name="product_name"
            className={
              errors && errors.title
                ? "product_name-input error-input"
                : "product_name-input"
            }
            onChange={handleChangeTitle}
          />
        </div>
        {errors && errors.title && <p className="error-text">{errors.title}</p>}

        <button className="btn btn-primary" onClick={handleSubmit}>
          Thêm
        </button>
      </form>
    </div>
  );
}

export default AddSize;
