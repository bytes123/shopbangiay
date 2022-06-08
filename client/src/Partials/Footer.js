import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="footer">
      <div className="sponsor">
        <div className="sponsor-items">
          <img src="https://brandlogos.net/wp-content/uploads/2014/11/air-jordan-logo-512x512.png" />
        </div>
        <div className="sponsor-items">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN2P6tjnw77ycCkWKNcEQeahsRqTuOLbVWkPTLjxjP-uVNoCBGmEDhJuSCE4ZUlQ5kqJc&usqp=CAU" />
        </div>
        <div className="sponsor-items">
          <img src="https://banner2.cleanpng.com/20190605/eqc/kisspng-logos-and-uniforms-of-the-new-york-yankees-mlb-bas-logo-cdn-5cf86d7a2ea7d0.9492898715597848261911.jpg" />
        </div>
        <div className="sponsor-items">
          <img src="https://drake.vn/image/catalog/H%C3%ACnh%20content/logo-vans/vans-logo_2.jpg" />
        </div>
      </div>
      <div className="contact">
        <div className="contact-items">
          <a href="https://www.facebook.com/profile.php?id=100059070234959">
            {" "}
            <FaFacebookF />
          </a>
        </div>
        <div className="contact-items">
          <FaInstagram />
        </div>
        <div className="contact-items">
          <FiTwitter />
        </div>
      </div>
      <div className="author">
        Hoàng Trân <br />
        2022
      </div>
    </div>
  );
}
