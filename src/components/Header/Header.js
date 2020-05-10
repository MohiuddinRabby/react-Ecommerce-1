import React, { useContext, useState } from "react";
import logo from "../../images/logo.png";
import "../Header/Header.css";
import { UserContext } from "../../App";
const Header = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="header">
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <h1>Count:{count}</h1>
      <h1>Previous</h1>
      <img src={logo} alt="" />
      <nav>
        <a href="/shop">Shop</a>
        <a href="/review">Review</a>
        <a href="/inventory">Inventory</a>
      </nav>
    </div>
  );
};

export default Header;
