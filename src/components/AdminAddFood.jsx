import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";


import { auth, db } from "../firebase/firebase.js";
import "./AdminFoodList.css";

const AdminAddFood = () => {
  const navigate = useNavigate();

  const handleView = async (category) => {
    let name;
    let price;
    let img;
    const { value: nameOfTheItem } = await Swal.fire({
      title: "Name of the item",
      input: "text",
      inputLabel: "Please Provide the item name",
      inputPlaceholder: "Please Provide the item name",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
    });
    if (!nameOfTheItem) {
      Swal.fire("Error", "Name of the item is required !", "error");
      return;
    }
    name = nameOfTheItem;
    const { value: priceOfTheItem } = await Swal.fire({
      title: "Price of the item",
      input: "text",
      inputLabel: "Please Provide the item price",
      inputPlaceholder: "Please Provide the item price",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
    });
    if (!priceOfTheItem) {
      Swal.fire("Error", "Price of the item is required !", "error");
      return;
    }
    price = priceOfTheItem;
    const { value: imgLinkOfTheItem } = await Swal.fire({
      title: "Image Link of the item",
      input: "text",
      inputLabel: "Please Provide the item image link",
      inputPlaceholder: "Please Provide the item image link",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
    });
    if (!imgLinkOfTheItem) {
      Swal.fire("Error", "Image Link of the item is required !", "error");
      return;
    }
    img = imgLinkOfTheItem;
    
    try {
      // Create a document with the same name as the food item inside its category
      const docRef = doc(db, category.toLowerCase(), name);

      await setDoc(docRef, {
        name: name,
        status: "Available",
        price: price,
        img: img,
      });

      await Swal.fire("Success", "Item Added Successfully", "success");
    } catch (err) {
      console.error("Failed to save item", err);
    }
  };

  return (
    <div className="admin-container">
      <Helmet>
        <title>Yoga Family Restaurant</title>
      </Helmet>

      {/* Header */}
      <header className="admin-header">
        <h1>Yoga Family Restaurant</h1>
      </header>

      {/* Main intro */}
      <div id="mainintro">
        <h1>Welcome to Yoga Family Restaurant</h1>
      </div>

      {/* Food list */}
      <div id="food-list" style={{backgroundColor:"inherit",boxShadow:"none"}}>
        {[
          { img: "/IMG_20250719_191256.jpg", name: "Biryani", key: "Biryani" },
          { img: "/parrota.jpg", name: "Parotta & Chappathi", key: "Parotta" },
          { img: "/naan.jpg", name: "Rotti/Naan", key: "Naan" },
          { img: "/fried_rice.jpg", name: "Fried Rice", key: "Fried-Rice" },
          { img: "/noodles.jpg", name: "Fried Noodles", key: "Fried-Noodles" },

          { img: "/grill_chicken.jpg", name: "Grill/Tandoori", key: "Grill" },
          { img: "/soup.jpg", name: "Soup", key: "Soup" },
          { img: "/starters.jpg", name: "Starters", key: "Starters" },
          { img: "/burger.jpg", name: "Burger/Sandwich", key: "Burger" },
          {
            img: "/shawarma.jpg",
            name: "Shawarma/Rolls/Wraps",
            key: "Shawarma",
          },
          { img: "/pizza.jpg", name: "Pizza", key: "Pizza" },
          {
            img: "/fried_chicken.jpg",
            name: "Fried Chicken",
            key: "Fried-Chicken",
          },
         
        ].map((item, index) => (
          <div key={index} className="items">
            <img src={item.img} alt={item.name} />
            <p>{item.name}</p>
            <button onClick={() => handleView(item.key)}>Add Item</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Yoga Family Restaurant</h3>
          <p>Delicious food served with love. Taste the tradition!</p>
          <p>
            📍 Location: No 789, Yoga Tower, Near Kalasalingam University,
            Krishnankoil
          </p>
          <p>📞 Contact: 99943 19875 , 87542 58484</p>
          <p>
            © {new Date().getFullYear()} Yoga Family Restaurant. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminAddFood;
