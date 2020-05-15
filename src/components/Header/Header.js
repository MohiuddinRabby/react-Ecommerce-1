import React, { useContext, useState, useRef, useEffect } from "react";
import logo from "../../images/logo.png";
import "../Header/Header.css";
import { useAuth } from "../Login/user-auth";

const Header = () => {
  const auth = useAuth();
  console.log(auth.user)
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <a href="/shop">Shop</a>
        <a href="/review">Review</a>
        <a href="/inventory">Inventory</a>
        { auth.user&&
        <span style={{color:'red'}}>{auth.user.name}</span>
        }
        {auth.user?<a href="/login">sign Out</a>
          :<a href="/login">SignIn</a>
        }
      </nav>
    </div>
  );
};

export default Header;
