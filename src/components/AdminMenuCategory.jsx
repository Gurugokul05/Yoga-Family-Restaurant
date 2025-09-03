import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { auth, db, app } from "./../firebase/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { SpinnerCircular } from 'spinners-react';

const AdminMenuCategory = () => {
  const [foodItems, setFoodItems] = useState([]);
 

  const { category } = useParams();
  // update the status of the food
  // console.log(category)

  const handleChange = async (item) => {
    const foodRef = doc(db, category, item.id);
    if(item.status === "Available"){
    try {
      await updateDoc(foodRef, {
        status: "Unavailable"
        
      });
      
      console.log("Success");
    } catch (error) {
      console.error("Unexpected Error Occured", error);
    }
  }
  else{
    try {
      await updateDoc(foodRef, {
        status: "Available"
      });
      console.log("Success");
    } catch (error) {
      console.error("Unexpected Error Occured", error);
    }
  }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      const itemref = collection(db, category);
      const snapshot = await getDocs(itemref);
      const items = snapshot.docs.map((doc) => ({
        id: `${doc.id}`,
        ...doc.data(),
      }));

      setFoodItems(items);
    };
    fetchData();
  }, [foodItems]);
{}
  return (
    <div>
      <Helmet>
        <title>Yoga Family Restaurant</title>
      </Helmet>
      <header>
        <div>
          <div>
            <h1>Yoga Family Restaurant</h1>
          </div>
        </div>
      </header>
      <div>
        <div>
          <div id="food-list">
            {foodItems.map((item) => (
              
              <div key={item.id} className="items">
                <img src={item.img} alt={item.name} />
                <p>{item.name}</p>
                <p>
                  ₹{item.price} - {item.status}
                </p>
                <button
                  
                  onClick={() => handleChange(item)}
                >
                  Change Status
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminMenuCategory;