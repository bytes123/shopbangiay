import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

import Table from "../../components/table/Table";

const Home = ({
  isAccountPage,
  isHome,
  isProductPage,
  list,
  cells,
  onChange,
  handleClick,
  handleChange,
  isBillPage,
  isBrandPage,
}) => {
  return (
    <div className="home_admin">
      <Sidebar />
      <div className="homeContainer">
        <Navbar
          onChange={onChange}
          isProductPage={isProductPage}
          isBillPage={isBillPage}
          isAccountPage={isAccountPage}
          isBrandPage={isBrandPage}
        />

        <div className="listContainer">
          {isHome ? <h1>Trang Admin</h1> : null}

          {isProductPage ? (
            <>
              <div className="listTitle">QUẢN LÝ SẢN PHẨM</div>
              <buttom
                className="btn btn-primary mb-4 mx-3"
                onClick={handleClick.handleOpenAddProduct}
              >
                Thêm sản phẩm
              </buttom>
              <buttom
                className="btn btn-primary mb-4 mx-3"
                onClick={handleClick.handleOpenAddDetailProduct}
              >
                Thêm chi tiết sản phẩm
              </buttom>
              <buttom
                className="btn btn-primary mb-4 mx-3"
                onClick={handleClick.handleOpenAddSizeProduct}
              >
                Thêm Size
              </buttom>
              <buttom
                className="btn btn-primary mb-4 mx-3"
                onClick={handleClick.handleOpenAddQualityProduct}
              >
                Thêm chất lượng
              </buttom>
              <buttom
                className="btn btn-primary mb-4 mx-3"
                onClick={handleClick.handleOpenAddColorProduct}
              >
                Thêm màu
              </buttom>
              <Table
                isProductPage={isProductPage}
                list={list}
                cells={cells}
                onModalUpdate={handleClick.handleOpenUpdateProduct}
                onModalDelete={handleClick.handleConfirmDeleteProduct}
                onModalDeleteDetail={
                  handleClick.handleConfirmDeleteDetailProduct
                }
              />
            </>
          ) : null}

          {isBillPage ? (
            <>
              <div className="listTitle">QUẢN LÝ ĐƠN HÀNG</div>

              <Table
                isBillPage={isBillPage}
                list={list}
                cells={cells}
                onOpenDetailBill={handleClick.onOpenDetailBill}
                onDestroyBill={handleClick.onDestroyBill}
                onDeleteBill={handleClick.onDeleteBill}
                onConfirmBill={handleClick.onConfirmBill}
              />
            </>
          ) : null}

          {isAccountPage ? (
            <>
              <div className="listTitle">QUẢN LÝ TÀI KHOẢN</div>

              <Table isAccountPage={isAccountPage} list={list} cells={cells} handleChange={handleChange} handleClick={handleClick}/>
            </>
          ) : null}

{isBrandPage ? (
            <>
            
              <div className="listTitle">QUẢN LÝ HÃNG</div>
              <buttom
                className="btn btn-primary mb-4 mx-3"
                onClick={handleClick.handleOpenAddBrand}
              >
                Thêm Hãng
              </buttom>
          

              <Table isBrandPage={isBrandPage} list={list} cells={cells} handleChange={handleChange} onModalUpdate={handleClick.handleOpenUpdateBrand} onDeleteBrand={handleClick.onDeleteBrand}/>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
