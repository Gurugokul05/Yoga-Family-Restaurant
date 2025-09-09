import React from "react";
import { Helmet } from "react-helmet";
import { Navigate, useNavigate } from "react-router-dom";
import AdminFoodList from "./AdminFoodList";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";


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
    <div>
      <Helmet>
        <title>Admin Pannel</title>
      </Helmet>
      <header style={{display:"flex",justifyContent:"space-between"}}>
        <div>
          <div>
            <h1>Yoga Family Restaurant</h1>
          </div>
        </div>
          <button onClick={() => handleLogOut()}>LogOut</button>
      </header>
        <h1 style={{textAlign:"center", marginTop: "20px"}}>Welcome to Admin Pannel</h1>
      <div id="food-list" style={{ marginTop: "20px" }}>
        <div className="items">
          <img src="/view_orders.jpeg" alt="" style={{borderRadius:"20%"}} />
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
