import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { auth, db } from "./../firebase/firebase";
import { collection, getDocs, addDoc, setDoc, doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";



const MenuCategory = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const { category } = useParams();
  // console.log(category)
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
  }, [category]);

  const [status, setStatus] = useState("Available");
  const handleCart = async (item) => {
    //prevent duplication logic here
    setCartItems((previousCartItems) => [...previousCartItems, item]);
    const user = auth.currentUser;
    const email = user.email;
    const foodId = item.id;
    const existingItemRef = doc(db,"users",email,"cart",foodId)
    const pathChecker = await getDoc(doc(db,"users",email,"cart",foodId))
    // console.log(pathChecker.id);
    
    // console.log("Existinng one",existingItemRef.id);
    try {
      //get the user email and store it in users->email-id->cart->food-items
      //getting the current user details and getting the email
      //.exists() return true if already exists and return false if not.
      const maxQuantity = 10;
      
      if(!pathChecker.exists() ){
        const addCart = await setDoc(doc(db, "users", email, "cart", foodId), {
          ...item,
          quantity: 1,
        });

      }
      
      //logic to update the quantity by one by using updateDoc , 
      //increment increase the quantity value by 1
      else{
         const currentQuantity = pathChecker.data().quantity || 0;
         if (currentQuantity < maxQuantity) {
        // Update quantity by +1
        setCartItems((previousCartItems) => [...previousCartItems, item]);

        await updateDoc(existingItemRef, {
          quantity: increment(1),
        });
      } else {
        alert("Max quantity reached!");
      }
      }
      
      // console.log("Added to cart Succesfully");
    } catch (error) {
      console.error(error);
    }
    
    
  };

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
                  disabled={item.status === "Unavailable"}
                  onClick={() => handleCart(item)}
                >
                  {item.status === "Available" ? "Add to Cart" : "Unavailable"}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button id="cart-sticky-button">
          <Link to="/cart">
            <FaShoppingCart size={40} />
          </Link>
        </button>
      </div>
      <div id="footer">
        <footer>
          <h2>Contact Information</h2>
          <br />
          <ul>
            <li>Phone Number : 99943 19875 , 87542 58484.</li>
            <br />

            <li>
              Address : No 789 , Yoga Tower , Near Kalasalingam University ,
              Krishnankoil.
            </li>
            <br />
            <li>
              <a
                href="https://maps.app.goo.gl/vErHfsb1LtGLzQgHA"
                target="_blank"
              >
                Gmap Link
              </a>
            </li>
            <br />
            <li>
              For orders Call the above numbers. Home Delivery Upto 3 KM.{" "}
            </li>
            <br />
            <li>Opening Hours : 10 A.M to 10 P.M .</li>
            <br />

            <br />
            <li>© 2025 Yoga Family Restaurant. All rights reserved.</li>
            <br />
            <li>Created by Gurugokul & Team .</li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default MenuCategory;
