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
  const handlePayment = async () => {
    if (total <= 0) {
      Swal.fire("Oops!", "Cart is empty!", "warning");
      return;
    }

    let contact = user?.phoneNumber || "";
    let address = user?.Address || "";
    let name = user?.Name || "";
    //get name
    const { value: userName } = await Swal.fire({
      title: "Enter your Name",
      input: "text",
      inputLabel: "Name",
      inputPlaceholder: "Enter your Name",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
    });
    if (!userName) {
      Swal.fire("Error", "User Name is required!", "error");
      return;
    }
    name = userName;
    // get phone number
    if (!contact) {
      const { value: phone } = await Swal.fire({
        title: "Enter your mobile number",
        input: "text",
        inputLabel: "10-digit mobile number",
        inputPlaceholder: "Enter your number",
        inputAttributes: {
          maxlength: 10,
          autocapitalize: "off",
          autocorrect: "off",
        },
        showCancelButton: true,
        
      });

      if (!phone) {
        Swal.fire("Error", "Phone number is required!", "error");
        return;
      }

      if (!/^\d{10}$/.test(phone)) {
        Swal.fire("Error", "Enter a valid 10-digit number", "error");
        return;
      }

      contact = `+91 ${phone}`;
      //get address
      const { value: userAddress } = await Swal.fire({
        title: "Enter your Delivery Address",
        input: "textarea",
        inputLabel: "Address",
        inputPlaceholder: "Enter your Delivery Address",
        inputAttributes: {
          autocapitalize: "off",
          autocorrect: "off",
        },
        showCancelButton: true,
      });
      if (!userAddress) {
        Swal.fire("Error", "Delivery Address is required!", "error");
        return;
      }
      address = userAddress;
    }

    // if(!address){
    //   const { value: userAddress } = await Swal.fire({
    //     title: "Enter your Delivery Address",
    //     input: "text",
    //     inputLabel: "Address",
    //     inputPlaceholder: "Enter your Delivery Address",
    //     inputAttributes: {
    //       autocapitalize: "off",
    //       autocorrect: "off",
    //     },
    //     showCancelButton: true,
    //   });
    //   if (!userAddress) {
    //     Swal.fire("Error", "Delivery Address is required!", "error");
    //     return;
    //   }
    // }

    // Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_SECRET_KEY, //  Razorpay test key
      amount: Math.round(total * 100), // paise
      currency: "INR",
      name: "Yoga Family Restaurant",
      description: "Food Order Payment",
      prefill: {
        name: name,
        email: user?.email || "",
        contact: contact,
        address: address,
        method: "upi", // hint UPI as preferred
      },
      handler: async function (response) {
        // console.log("Payment success:", response);

        // Save payment in Firestore
        try {
          await addDoc(collection(db, "orders"), {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id || null,
            signature: response.razorpay_signature || null,
            name: name,
            email: user?.email || "",
            amount: total,
            contact: contact,
            address: address,
            timestamp: Date.now(),
            paymentStatus: "success",
            ...cartItems,
          });
        } catch (err) {
          console.error("Failed to save payment:", err);
        }

        // SweetAlert success
        await Swal.fire(
          "Success",
          "Payment successful! Thank you for your order.",
          "success"
        );

        // Clear cart from Firestore
        const cartRef = collection(db, "users", email, "cart");
        const snapshot = await getDocs(cartRef);
        const batch = writeBatch(db);
        snapshot.docs.forEach((docItem) => batch.delete(docItem.ref));
        await batch.commit();

        // Clear local state
        setCartItems([]);

        // Redirect to home

        navigate("/home");
      },

      modal: {
        escape: true,
        ondismiss: function () {
          console.log("Checkout closed by user");
        },
      },
      theme: { color: "#0B874E" },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      Swal.fire("Error", "Failed to open payment. Try again.", "error");
    }
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
