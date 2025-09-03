import React from "react";
import { Helmet } from "react-helmet";
import { Navigate, useNavigate } from "react-router-dom";
import AdminFoodList from "./AdminFoodList";

const AdminPanel = () => {
  const navigate = useNavigate();
  const viewOrders = () => {};
  const editStatus = () => {
    navigate("/food-list");
  };
  const changePrice = () => {
    navigate("/food-list-for-price-change");
  };
  return (
    <div>
      <Helmet>
        <title>Admin Pannel</title>
      </Helmet>
      <header>
        <div>
          <div>
            <h1>Yoga Family Restaurant</h1>
          </div>
        </div>
      </header>
        <h1 style={{textAlign:"center", marginTop: "20px"}}>Welcome to Admin Pannel</h1>
      <div id="food-list" style={{ marginTop: "20px" }}>
        <div className="items">
          <img src="./src/assets/view_orders.jpeg" alt="" style={{borderRadius:"20%"}} />
          <p>View Orders</p>
          <button onClick={() => viewOrders()}>View Orders</button>
        </div>
        <div className="items">
          <img src="./src/assets/edit_icon.jpeg" alt="" />
          <p>Edit Status</p>
          <button onClick={() => editStatus()}>Edit Status</button>
        </div>
        <div className="items">
          <img src="./src/assets/change_price.jpeg" alt="" />
          <p>Change Price</p>
          <button onClick={() => changePrice()}>Change price</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
