import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  increment,
  addDoc,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";
import Swal from "sweetalert2";

import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;
  const email = user.email;
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    const fetchData = async () => {
      const itemRef = collection(db, "users", email, "cart");
      const snapshot = await getDocs(itemRef);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Calculate total
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(total);
  }, [cartItems]);

  // Remove item
  const removeItem = async (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    await deleteDoc(doc(db, "users", email, "cart", id));
  };

  // Update quantity
  const updateQuantityDecrease = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item.quantity <= 1) return;

    setCartItems(
      cartItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      )
    );

    const ref = doc(db, "users", email, "cart", id);
    await updateDoc(ref, { quantity: increment(-1) });
  };

  const updateQuantityAdd = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item.quantity >= 10) return;

    setCartItems(
      cartItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );

    const ref = doc(db, "users", email, "cart", id);
    await updateDoc(ref, { quantity: increment(1) });
  };

  // Payment
  // UPI Payment (Deep Link Method)
const handlePayment = async () => {
  if (total <= 0) {
    Swal.fire("Oops!", "Cart is empty!", "warning");
    return;
  }

  // Ask for customer name, phone, address (same as before)
  let contact = user?.phoneNumber || "";
  let address = user?.Address || "";
  let name = user?.Name || "";

  const { value: userName } = await Swal.fire({
    title: "Enter your Name",
    input: "text",
    inputLabel: "Name",
    inputPlaceholder: "Enter your Name",
    showCancelButton: true,
  });
  if (!userName) return Swal.fire("Error", "Name is required!", "error");
  name = userName;

  const { value: phone } = await Swal.fire({
    title: "Enter your mobile number",
    input: "text",
    inputLabel: "10-digit mobile number",
    inputPlaceholder: "Enter your number",
    showCancelButton: true,
  });
  if (!phone || !/^\d{10}$/.test(phone)) {
    return Swal.fire("Error", "Enter a valid 10-digit number", "error");
  }
  contact = `+91 ${phone}`;

  const { value: userAddress } = await Swal.fire({
    title: "Enter your Delivery Address",
    input: "textarea",
    inputLabel: "Address",
    inputPlaceholder: "Enter your Delivery Address",
    showCancelButton: true,
  });
  if (!userAddress) return Swal.fire("Error", "Address is required!", "error");
  address = userAddress;

  // Build the UPI payment link
  const upiId = "gurugokul05@oksbi"; // 👈 replace with your restaurant UPI ID
  const payeeName = encodeURIComponent("Yoga Family Restaurant");
  const amount = total.toFixed(2);
  const note = encodeURIComponent("Order Payment");
  const upiLink = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${note}`;

  // Open UPI payment app
  window.location.href = upiLink;

  // After a small delay, assume order placed (since we can’t auto-verify)
  setTimeout(async () => {
    await addDoc(collection(db, "orders"), {
      name,
      email: user?.email || "",
      contact,
      address,
      amount: total,
      items: cartItems,
      paymentMethod: "UPI",
      timestamp: Date.now(),
      status: "Pending Verification",
    });

    Swal.fire(
      "Payment Initiated",
      "Please complete the UPI payment in your app.\nWe'll verify and confirm shortly.",
      "info"
    );

    // Clear cart locally and in Firestore
    const cartRef = collection(db, "users", email, "cart");
    const snapshot = await getDocs(cartRef);
    const batch = writeBatch(db);
    snapshot.docs.forEach((docItem) => batch.delete(docItem.ref));
    await batch.commit();

    setCartItems([]);
    navigate("/home");
  }, 5000);
};


  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
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
            minHeight: "80vh",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1>Cart is Empty</h1>
          <div style={{ marginTop: "10px" }}>
            <button>
              <Link to="/home">Go back to menu</Link>
            </button>
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
                <button onClick={() => updateQuantityDecrease(item.id)}>
                  -
                </button>
                <span style={{ padding: "5px 10px" }}>{item.quantity}</span>
                <button onClick={() => updateQuantityAdd(item.id)}>+</button>
                <button onClick={() => removeItem(item.id)} id="remove">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div id="checkout-items">
          <h2>Total: ₹{total}</h2>
          <button onClick={handlePayment}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
