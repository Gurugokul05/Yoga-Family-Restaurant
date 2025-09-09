import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { auth, db, app } from "./../firebase/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { SpinnerCircular } from 'spinners-react';

const AdminMenuForPriceChange = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading,setLoading] = useState(true);
   const navigate = useNavigate();
  
    const { category } = useParams();
    // update the status of the food
    // console.log(category)
  
    const handleChange = async (item) => {
      const newPrice = window.prompt("Enter the price :", item.price);
      if(!newPrice) return;
      const foodRef = doc(db, category, item.id);
          
          try {
            await updateDoc(foodRef, {
              price:newPrice
              
            });
            
            console.log("Success");
          } catch (error) {
            console.error("Unexpected Error Occured", error);
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
        setLoading(false);
      };
      fetchData();
    }, [foodItems]);
  {}
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
  else{
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
                    Change price
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default AdminMenuForPriceChange