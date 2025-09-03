import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { auth, db} from "./../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";






const MenuCategory = () => {
  
  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems] = useState(
  JSON.parse(localStorage.getItem("cart")) || []
  // ()=>{
  //   try {
  //     const gettingItems = localStorage.getItem("cart");
  //     return gettingItems ? JSON.parse(gettingItems) : [];
  //   } catch (error) {
  //     console.error("Error Occure")
  //     return [];
  //   }
  // }
);


  const {category} = useParams();
  
  useEffect(() => {
    
    const fetchData = async () => {
      const itemref = collection(db, category);
      const snapshot = await getDocs(itemref);
      const items = snapshot.docs.map((doc) => ({
  id: `${category}-${doc.id}`,
  ...doc.data(),
}));

      setFoodItems(items);
    };
    fetchData();
  }, [category]);

  const [status, setStatus] = useState("Available");
  const handleCart = (item) => {
  const uniqueId = `${item.id}-${item.name}`;
  const existingIndex = cartItems.findIndex(c => c.id === uniqueId);

  let newCart;
  if (existingIndex !== -1) {
    newCart = [...cartItems];
    newCart[existingIndex].quantity += 1;
  } else {
    newCart = [
      ...cartItems,
      { id: uniqueId, name: item.name, price: item.price, img: item.img || "", quantity: 1 }
    ];
    alert(`${item.name} added to cart!`);
  }

  setCartItems(newCart); // update state
  localStorage.setItem("cart", JSON.stringify(newCart));
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
        <button id="cart-sticky-button"><Link to="/cart"><FaShoppingCart size={40} /></Link></button>

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
