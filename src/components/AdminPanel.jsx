import React from "react";
import { Helmet } from "react-helmet";
import { Navigate, useNavigate } from "react-router-dom";
import AdminFoodList from "./AdminFoodList";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import "./AdminPanel.css"

const AdminPanel = () => {
  const navigate = useNavigate();
  const viewOrders = () => {};
  const editStatus = () => {
    navigate("/food-list");
  };
  const changePrice = () => {
    navigate("/food-list-for-price-change");
  };
  const handleLogOut = () => {
    //sign out function 
    signOut(auth)
      .then(() => {
        // console.log("Logged out");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div id="top-container">
      <Helmet>
        <title>Admin Pannel</title>
      </Helmet>
      <header>
        <div>
          <div>
            <h1>Yoga Family Restaurant</h1>
          </div>
        </div>
          <button onClick={() => handleLogOut()}>LogOut</button>
      </header>
        <h1>Welcome to Admin Pannel</h1>
      <div id="food-list" >
        <div className="items">
          <img src="/view_orders.jpeg" alt="" />
          <p>View Orders</p>
          <button onClick={() => viewOrders()}>View Orders</button>
        </div>
        <div className="items">
          <img src="/edit_icon.jpeg" alt="" />
          <p>Edit Status</p>
          <button onClick={() => editStatus()}>Edit Status</button>
        </div>
        <div className="items">
          <img src="/change_price.jpeg" alt="" />
          <p>Change Price</p>
          <button onClick={() => changePrice()}>Change price</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
