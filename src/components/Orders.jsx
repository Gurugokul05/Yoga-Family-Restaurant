import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { auth, db } from "./../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const snapshot = await getDocs(ordersRef);

        const fetchedOrders = snapshot.docs.map((doc) => {
          const data = doc.data();

          const items = Object.keys(data)
            .filter((key) => !isNaN(key))
            .map((key) => data[key]);

          return {
            id: doc.id,
            amount: data.amount || 0,
            orderId: data.orderId || "N/A",
            paymentId: data.paymentId || "N/A",
            signature: data.signature || "N/A",
            status: data.paymentStatus || "Pending",
            name: data.name,
            email: data.email,
            address: data.address,
            number: data.contact,
            timestamp: data.timestamp
              ? new Date(data.timestamp).toLocaleString()
              : "N/A",
            items,
          };
        });

        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        Swal.fire("Error", "Failed to load orders", "error");
      }
    };

    fetchOrders();
  }, []);

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

  return (
    <div>
      <Helmet>
        <title>Orders | Yoga Family Restaurant</title>
      </Helmet>

      <header>
        <h1>Yoga Family Restaurant - Orders</h1>
      </header>

      <div id="cart-main" style={{ padding: "20px" }}>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",

                width: "auto",
              }}
            >
              <h3>Order ID : {order.id}</h3>
              <p>
                <strong>Name : </strong>
                {order.name}
              </p>
              <p>
                <strong>Phone Number : </strong>
                {order.number}
              </p>
              <p>
                <strong>Email : </strong>
                {order.email}
              </p>
              <p>
                <strong>Address : </strong>
                {order.address}
              </p>

              <p>
                <strong>Amount : </strong> ₹{order.amount}
              </p>
              <p>
                <strong>Status : {order.status}</strong> 
              </p>
              <p>
                <strong>Payment ID : </strong> {order.paymentId}
              </p>
              <p>
                <strong>Timestamp : </strong> {order.timestamp}
              </p>

              <h4>Ordered Items : </h4>

              {order.items.map((food, index) => (
                <p key={index}>
                  <b>{food.id ? `${food.id}` : `Item ${index + 1}`} </b>
                  <b>{food.quantity ? `X ${food.quantity}` : ""}</b>
                </p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
