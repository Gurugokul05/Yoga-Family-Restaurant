import { useState } from "react";
import { Routes, Route } from "react-router-dom";
//import './App.css'
import AdminLogin from "./components/AdminLogin";
import Register from "./components/Register";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import MenuCategory from "./components/MenuCategory";
import MenuCategoryWrapper from "./components/MenuCategoryWrapper";
import Cart from "./components/Cart";
import AdminFoodList from "./components/AdminFoodList";
import AdminMenuCategory from "./components/AdminMenuCategory";
import AdminMenuCategoryWrapper from "./components/AdminMenuCategoryWrapper";
import AdminFoodListForChangePrice from "./components/AdminFoodListForChangePrice";
import AdminMenuForPriceChangeWrapper from "./components/AdminMenuForPriceChangeWrapper";
import ProtectedRoute from "./components/ProtectedRoute";
import UserRoute from "./components/UserRoute";

function App() {
  return (
    <Routes>

      {/* public routes */}
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<AdminLogin />}></Route>
      <Route path="/" element={<AdminLogin />}></Route>
      <Route path="/register" element={<Register />}></Route>

      {/* users route */}
      <Route element={<UserRoute />}>
        <Route path="/home/:category" element={<MenuCategoryWrapper />} />
        <Route path="/cart" element={<Cart />}></Route>
      </Route>
      
      {/* admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/food-list/:category"
          element={<AdminMenuCategoryWrapper />}
        />
        <Route
          path="/food-list-for-price-change/:category"
          element={<AdminMenuForPriceChangeWrapper />}
        />
        <Route
          path="/food-list-for-price-change"
          element={<AdminFoodListForChangePrice />}
        ></Route>
        <Route path="/food-list" element={<AdminFoodList />}></Route>
        <Route path="/admin-pannel" element={<AdminPanel />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
