import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { auth, db} from "./../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";




export const priceOfTheFood = createContext(null)

const MenuCategory = () => {
  
  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems] = useState(
  
);


  const {category} = useParams();
  // console.log(category)
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
