import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
//import './App.css'
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import MenuCategory from './components/MenuCategory';
import MenuCategoryWrapper from './components/MenuCategoryWrapper';
import Cart from './components/Cart';
import AdminFoodList from './components/AdminFoodList';
import AdminMenuCategory from './components/AdminMenuCategory';
import AdminMenuCategoryWrapper from './components/AdminMenuCategoryWrapper';
import AdminFoodListForChangePrice from './components/AdminFoodListForChangePrice';
import AdminMenuForPriceChangeWrapper from './components/AdminMenuForPriceChangeWrapper';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<AdminLogin/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/admin-pannel' element={<AdminPanel/>}></Route>
      <Route path="/home/:category" element={<MenuCategoryWrapper />} />
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/food-list' element={<AdminFoodList/>}></Route>
      <Route path='/food-list-for-price-change' element={<AdminFoodListForChangePrice/>}></Route>
      
      <Route path="/food-list/:category" element={<AdminMenuCategoryWrapper />} />
      <Route path="/food-list-for-price-change/:category" element={<AdminMenuForPriceChangeWrapper />} />
    </Routes>
  )
}

export default App
