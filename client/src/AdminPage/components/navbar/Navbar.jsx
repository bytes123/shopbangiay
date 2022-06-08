import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


const Navbar = ({onChange,isProductPage,isBillPage,isAccountPage,isBrandPage}) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
         {isProductPage &&  <input type="text" placeholder="Tìm kiếm theo tên sản phẩm..." onChange={(e) => onChange(e)}/>}
         {isBillPage &&  <input type="text" placeholder="Tìm kiếm theo mã đơn hàng..." onChange={(e) => onChange(e)}/>}
         {isAccountPage &&  <input type="text" placeholder="Tìm kiếm theo tên tài khoản..." onChange={(e) => onChange(e)}/>}
         {isBrandPage &&  <input type="text" placeholder="Tìm kiếm theo tên hãng..." onChange={(e) => onChange(e)}/>}
          <SearchOutlinedIcon />
        </div>
        <div className="items">
     
        
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
