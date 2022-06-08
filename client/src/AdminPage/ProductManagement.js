import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import { useStateValue } from "../StateProvider";
import Modal from "../Modal/Modal";
import AddProduct from "./components/modal/AddProduct";
import AddDetailProduct from "./components/modal/AddDetailProduct";
import UpdateProduct from "./components/modal/UpdateProduct";
import AddSize from "./components/modal/AddSize";
import AddQuality from "./components/modal/AddQuality";
import AddColor from "./components/modal/AddColor";
import Toast from "../toast/Toast";

function ProductManagement() {
  const [{ details_product, products, size, quality, colors }, dispatch] =
    useStateValue();
  const [productList, setProductList] = useState([]);
  const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
  const [isOpenAddDetailProduct, setIsOpenAddDetailProduct] = useState(false);
  const [isOpenUpdateProduct, setIsOpenUpdateProduct] = useState(false);
  const [isOpenSizeProduct, setIsOpenSizeProduct] = useState(false);
  const [isOpenQualityProduct, setIsOpenQualityProduct] = useState(false);
  const [isOpenColorProduct, setIsOpenColorProduct] = useState(false);
  const [product, setProduct] = useState();
  const axios = require("axios");
  const { success } = Toast;

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

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:5000/products");

      dispatch({
        type: "GET_PRODUCTS",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const searchProducts = async (product_name) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/search-products",
        data: {
          product_name: product_name,
        },
      });
      if (Array.isArray(response.data)) {
        setProductList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const modalFormProduct = {
    handleOpenAddProduct: function handleOpenAddProduct() {
      setIsOpenAddProduct(true);
    },
    handleOpenAddDetailProduct: function handleOpenAddDetailProduct() {
      setIsOpenAddDetailProduct(true);
    },
    handleOpenUpdateProduct: function handleOpenUpdateProduct(product) {
      setProduct(product);
      setIsOpenUpdateProduct(true);
    },
    handleConfirmDeleteProduct: function (product) {
      // DELETE PRODUCT SENDING
      async function deleteProduct(product_id) {
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:5000/delete-product",
            data: {
              product_id: product_id,
            },
          });

          if (response) {
            getDetailsProduct();
            getProducts();
            success(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
      if (window.confirm("Bạn có chắc muốn xóa sản phẩm không?") == true) {
        deleteProduct(product.product_id);
      } else {
        console.log("No");
      }
    },
    handleConfirmDeleteDetailProduct: function (product) {
      // DELETE PRODUCT SENDING
      async function deleteDetailProduct(details_product_id) {
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:5000/delete-detail-product",
            data: {
              details_product_id: details_product_id,
            },
          });

          if (response) {
            getDetailsProduct();
            getProducts();
            success(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
      if (
        window.confirm("Bạn có chắc muốn xóa chi tiết sản phẩm không?") == true
      ) {
        deleteDetailProduct(product.details_product_id);
      } else {
        console.log("No");
      }
    },
    handleOpenAddSizeProduct: () => {
      setIsOpenSizeProduct(true);
    },
    handleOpenAddQualityProduct: () => {
      setIsOpenQualityProduct(true);
    },
    handleOpenAddColorProduct: () => {
      setIsOpenColorProduct(true);
    },
  };

  const handleChange = (e) => {
    searchProducts(e.target.value);
  };

  useEffect(() => {
    console.log(details_product);
    setProductList(details_product);
    setIsOpenAddDetailProduct(false);
    setIsOpenUpdateProduct(false);
  }, [details_product]);

  useEffect(() => {
    setIsOpenSizeProduct(false);
  }, [size]);

  useEffect(() => {
    setIsOpenQualityProduct(false);
  }, [quality]);

  useEffect(() => {
    setIsOpenColorProduct(false);
  }, [colors]);

  useEffect(() => {
    setIsOpenAddProduct(false);
  }, [products]);

  const productCells = [
    "ID",
    "Hình sản phẩm",
    "Tên sản phẩm",
    "Danh mục",
    "Hãng",
    "SIZE",
    "Chất lượng",
    "Màu sắc",
    "Giá gốc",
    "Giá giảm",
    "Số lượng hàng",
    "",
    "",
    "",
  ];

  return (
    <div>
      <Home
        list={productList}
        isProductPage={true}
        cells={productCells}
        onChange={handleChange}
        handleClick={modalFormProduct}
      />
      <Modal
        handleOpenModal={setIsOpenAddProduct}
        isOpenModal={isOpenAddProduct}
        ModalForm={AddProduct}
      />
      <Modal
        handleOpenModal={setIsOpenAddDetailProduct}
        isOpenModal={isOpenAddDetailProduct}
        ModalForm={AddDetailProduct}
      />
      <Modal
        handleOpenModal={setIsOpenUpdateProduct}
        isOpenModal={isOpenUpdateProduct}
        ModalForm={() => <UpdateProduct product={product} />}
      />

      <Modal
        handleOpenModal={setIsOpenSizeProduct}
        isOpenModal={isOpenSizeProduct}
        ModalForm={AddSize}
      />

      <Modal
        handleOpenModal={setIsOpenQualityProduct}
        isOpenModal={isOpenQualityProduct}
        ModalForm={AddQuality}
      />

      <Modal
        handleOpenModal={setIsOpenColorProduct}
        isOpenModal={isOpenColorProduct}
        ModalForm={AddColor}
      />
    </div>
  );
}

export default ProductManagement;
