import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  increment,
  getDoc
  
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [price, setPrice] = useState([]);
  const [total, setTotal] = useState(0);

  //getting the price of the food from db

  useEffect(() => {
    // fetch the cart data from db
    const fetchData = async () => {
      const user = auth.currentUser;
      const email = user.email;
      const itemref = collection(db, "users", email, "cart");
      const snapshot = await getDocs(itemref);
      const items = snapshot.docs.map((doc) => ({
        id: `${doc.id}`,
        ...doc.data(),
      }));

      setCartItems(items);

      // setQuantityofFood(items.id)
    };
    fetchData();
  }, []);


  //total changes here

  useEffect(() => {
    
   const total = cartItems.reduce((accumulator,element)=>{
    return accumulator + element.price * element.quantity
   },0)
   setTotal(total)
    
  }, [cartItems]);

  const removeItem = async (id) => {
    //get the id and delete that from db
    setCartItems(
      cartItems.filter((item => item.id !== id))
    );
    await deleteDoc(doc(db, "users", email, "cart", id));
  };
  //update the quantity of food from db and also changing the db quantity
  //get the current user email through auth.currentUser and get the email so that we can get into the desired db
  const user = auth.currentUser;
  const email = user.email;




  //quantity decrease logic
  const updateQuantityDecrease = async (id) => {

    const item = cartItems.find((items) => items.id === id );
    if(item.quantity <= 1){
      return ;
    }
    //updating the local state first
    setCartItems(cartItems.map(element => element.id===id ? {...element,quantity:element.quantity-1}:element))
    //get the id and update the db
    const reference = doc(db, "users", email, "cart", id)
    await updateDoc(reference,{
      quantity:increment(-1)
    });
  };



  //quantity update logic
  const updateQuantityAdd = async (id) => {
    const item = cartItems.find((items) => items.id === id );
    if(item.quantity >= 10){
      return ;
    }
    //updating the local state first
    setCartItems(cartItems.map(element => element.id===id ? {...element,quantity:element.quantity+1}:element))
    //get the id and update the db
    const reference = doc(db, "users", email, "cart", id)
    await updateDoc(reference,{
      quantity:increment(+1)
    });
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <div>
          <Helmet>
            <title>Yoga Family Restaurant | Cart</title>
          </Helmet>

          <header>
            <h1>Yoga Family Restaurant</h1>
          </header>

          <div
            id="cart-main"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh", // full height so content is centered vertically
              textAlign: "center",
              padding: "20px",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Cart is Empty</h1>

            <div style={{ marginTop: "10px" }}>
              <button>
                <Link to="/home">Go back to menu</Link>
              </button>
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
                  onClick={() => updateQuantityDecrease(item.id)}
                  // disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span style={{ padding: "5px 10px" }}>{item.quantity}</span>
                <button
                  style={{ marginRight: "5px" }}
                  onClick={() => updateQuantityAdd(item.id)}
                  // disabled={item.quantity >= 10}
                >
                  +
                </button>
                <button onClick={() => removeItem(item.id)} id="remove">
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
