import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { db } from "./../firebase/firebase.js";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AdminMenuForPriceChange = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { category } = useParams();

  //  Change price with SweetAlert2
  const handleChange = async (item) => {
    const { value: newPrice } = await Swal.fire({
      title: "Change Item Price",
      input: "number",
      inputLabel: `Current price: ₹${item.price}`,
      inputValue: item.price,
      inputAttributes: {
        min: 1,
        step: 0.01,
      },
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
    });

    if (!newPrice) return;

    const foodRef = doc(db, category, item.id);

    try {
      await updateDoc(foodRef, { price: newPrice });

      Swal.fire({
        icon: "success",
        title: "Price Updated",
        text: `New price: ₹${newPrice}`,
        timer: 1500,
        showConfirmButton: false,
      });

      //  update local state without refetching whole list
      setFoodItems((prev) =>
        prev.map((f) =>
          f.id === item.id ? { ...f, price: newPrice } : f
        )
      );
    } catch (error) {
      console.error("Unexpected Error Occurred", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update price. Try again.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemRef = collection(db, category);
        const snapshot = await getDocs(itemRef);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [category]); //  fetch only when category changes

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
  } else {
    return (
      <div>
        <Helmet>
          <title>Yoga Family Restaurant</title>
        </Helmet>
        <header>
          <h1>Yoga Family Restaurant</h1>
        </header>

        <div id="food-list" style={{backgroundColor:"inherit",boxShadow:"none"}}>
          {foodItems.map((item) => (
            <div key={item.id} className="items">
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
              <p>
                ₹{item.price} - {item.status}
              </p>
              <button onClick={() => handleChange(item)}>
                Change price
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default AdminMenuForPriceChange;
