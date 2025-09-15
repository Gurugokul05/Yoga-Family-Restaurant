import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { auth, db } from "./../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

const MenuCategory = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
    const existingItemRef = doc(db, "users", email, "cart", foodId);
    const pathChecker = await getDoc(doc(db, "users", email, "cart", foodId));
    // console.log(pathChecker.id);

    // console.log("Existinng one",existingItemRef.id);
    try {
      //get the user email and store it in users->email-id->cart->food-items
      //getting the current user details and getting the email
      //.exists() return true if already exists and return false if not.
      const maxQuantity = 10;

      if (!pathChecker.exists()) {
        const addCart = await setDoc(doc(db, "users", email, "cart", foodId), {
          ...item,
          quantity: 1,
        });
        Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added to cart",
      showConfirmButton: false,
      timer: 1000,
      toast: true
    });
      }

      //logic to update the quantity by one by using updateDoc ,
      //increment increase the quantity value by 1
      else {
        const currentQuantity = pathChecker.data().quantity || 0;
        if (currentQuantity < maxQuantity) {
          // Update quantity by +1
          setCartItems((previousCartItems) => [...previousCartItems, item]);

          await updateDoc(existingItemRef, {
            quantity: increment(1),
          });
          Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added to cart",
      showConfirmButton: false,
      timer: 1000,
      toast: true
    });
        } else {
          Swal.fire({
        icon: 'warning',
        title: 'Maximum quantity reached',
        text: `You have 10 items of this in your cart already`,
      });
        }
      }

      // console.log("Added to cart Succesfully");
    } catch (error) {
      console.error(error);
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
  } else {
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
                    {item.status === "Available"
                      ? "Add to Cart"
                      : "Unavailable"}
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
            {/* Column 1 - About */}
            <div className="footer-section">
              <h2>Yoga Family Restaurant</h2>
              <p>
                Serving love and taste since 2025. Enjoy authentic flavors,
                fresh ingredients, and a family-friendly atmosphere. Dine-in or
                order online for doorstep delivery.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div className="footer-section">
              <h3>Contact Us</h3>
              <ul>
                <li>📞 99943 19875 , 87542 58484</li>
                <li>
                  📍 No 789, Yoga Tower, Near Kalasalingam University,
                  Krishnankoil
                </li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/vErHfsb1LtGLzQgHA"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Google Maps
                  </a>
                </li>
              </ul>
              <div className="social-icons">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </footer>

          <div className="footer-bottom">
            <p>© 2025 Yoga Family Restaurant | All Rights Reserved</p>
            <p>Created by Gurugokul & Team</p>
          </div>
        </div>
      </div>
    );
  }
};

export default MenuCategory;
