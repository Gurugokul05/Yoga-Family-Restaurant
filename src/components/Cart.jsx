import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {collection,getDocs} from "firebase/firestore";
import {db} from "../firebase/firebase.js"
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [price,setPrice] = useState([]);
  const [total, setTotal] = useState(0);


  //getting the price of the food from db
  // useEffect(() => {
  //   try {
  //     const gettingItems = localStorage.getItem("cart");
  //      const cart =  gettingItems ? JSON.parse(gettingItems) : [];
  //      console.log(cart);
       
  //      setCartItems(cart);
  //   } catch (error) {
      
  //   }
  // }
  //   )
  


  

  useEffect(() => {
    const newTotal = price.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
    localStorage.setItem("cart", JSON.stringify(price));
    
  }, [price]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  if (cartItems.length === 0) {
    return (
      <div>
        
        <div >
      <Helmet>
        <title>Yoga Family Restaurant | Cart</title>
      </Helmet>

      <header>
        <h1>Yoga Family Restaurant</h1>
      </header>

      <div id="cart-main" style={{ 
  display: "flex", 
  flexDirection: "column", 
  justifyContent: "center", 
  alignItems: "center", 
  minHeight: "80vh",   // full height so content is centered vertically
  textAlign: "center",
  padding: "20px"
}}>
        <h1 style={{textAlign:"center"}}>Cart is Empty</h1>
        

        <div style={{marginTop:"10px"}}>
          
          <button><Link to="/home">Go back to menu</Link></button>
        </div>
      </div>
    </div>
        
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Yoga Family Restaurant | Cart</title>
      </Helmet>

      <header>
        <h1>Yoga Family Restaurant</h1>
      </header>

      <div id="cart-main">
        <h1>Cart Items</h1>
        <div id="cart">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.name}`} className="cart-items">

              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <div id="cart-buttons">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span style={{ padding: "5px 10px" }}>{item.quantity}</span>
                <button style={{ marginRight:"5px" }}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button onClick={() => removeItem(item.id)} id="remove"  >
                  Remove
                </button>
              </div>
              
            </div>
            
          ))}
        </div>

        <div id="checkout-items">
          <h2>Total: ₹{total}</h2>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
