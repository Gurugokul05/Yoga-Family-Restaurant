import React from "react";
import { Helmet } from "react-helmet";
import {  NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import "./Home.css";
const Home = () => {

  const navigate = useNavigate();
  const handleView = (category)=>{
    // <Link to={`/home/${category.toLowerCase()}`}></Link>
    navigate(`/home/${category.toLowerCase()}`)
  }
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
        <div id="mainintro">
          <h1>Welcome to Yoga Family Restaurant</h1>
          <p id="paragraph">
            At Yoga Family Restaurant, we believe that good food brings people
            together. Located in the heart of Krishnan Koil, our family-run
            restaurant offers a warm and welcoming atmosphere where tradition,
            taste, and togetherness are at the core of everything we do. Serving
            with love, we offer a variety of vegetarian and non-vegetarian
            dishes prepared with fresh ingredients and authentic flavors. From
            South Indian classics to mouthwatering specials, every dish is
            crafted to bring comfort and delight. Now delivering happiness to
            your doorstep! Enjoy our delicious meals from the comfort of your
            home with our prompt and reliable delivery service. Whether it’s a
            family dinner, a casual outing, or a quick takeaway,Yoga Family
            Restaurant is your go-to destination for tasty, wholesome food. Our
            menu is given below — take a look and find your next favorite dish!
          </p>
        </div>
        <div id="food-list">
          <div className="items">
            <img src="./src/assets/IMG_20250719_191256.jpg" alt="Biryani" />
            <p>Biryani</p>
            {/* <NavLink to="/home/biryani" className="Button">View</NavLink> */}
            <button onClick={()=> handleView("Biryani")} >View</button>
          </div>
          <div className="items">
            <img src="./src/assets/parrota.jpg" alt="Parotta & Chappathi" />
            <p>Parotta & Chappathi</p>
            <button onClick={()=> handleView("Parotta")} >View</button>
          </div>
          <div className="items">
            <img src="./src/assets/naan.jpg" alt="Rotti/Naan" />
            <p>Rotti/Naan</p>
            <button  onClick={()=> handleView("Naan")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/fried_rice.jpg" alt="Fried Rice" />
            <p>Fried Rice</p>
            <button  onClick={()=> handleView("Fried-Rice")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/noodles.jpg" alt="Fried Noodles" />
            <p>Fried Noodles</p>
            <button  onClick={()=> handleView("Fried-Noodles")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/dosa.jpg" alt="Dosa" />
            <p>Dosa</p>
            <button  onClick={()=> handleView("Dosa")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/chicken_gravy.jpg" alt="Chicken Gravy" />
            <p>Chicken Gravy</p>
            <button  onClick={()=> handleView("Chicken-Gravy")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/egg_gravy.jpg" alt="Egg" />
            <p>Egg</p>
            <button  onClick={()=> handleView("Egg")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/veg_gravy.jpg" alt="Veg Gravy" />
            <p>Veg Gravy</p>
            <button  onClick={()=> handleView("Veg-Gravy")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/grill_chicken.jpg" alt="Grill/Tandoori" />
            <p>Grill/Tandoori</p>
            <button  onClick={()=> handleView("Grill")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/soup.jpg" alt="Soup" />
            <p>Soup</p>
            <button  onClick={()=> handleView("Soup")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/starters.jpg" alt="Starters" />
            <p>Starters</p>
            <button  onClick={()=> handleView("Starters")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/burger.jpg" alt="Burger/Sandwich" />
            <p>Burger/Sandwich</p>
            <button  onClick={()=> handleView("Burger")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/shawarma.jpg" alt="Shawarma/Rolls/Wraps" />
            <p>Shawarma/Rolls/Wraps</p>
            <button  onClick={()=> handleView("Shawarma")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/pizza.jpg" alt="Pizza" />
            <p>Pizza</p>
            <button  onClick={()=> handleView("Pizza")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/fried_chicken.jpg" alt="Fried Chicken" />
            <p>Fried Chicken</p>
            <button  onClick={()=> handleView("Fried-Chicken")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/juice.jpg" alt="Mojito/Fresh Juice" />
            <p>Mojito/Fresh Juice</p>
            <button  onClick={()=> handleView("Fresh-Juice")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/icecream.jpg" alt="Ice Creams" />
            <p>Ice Creams</p>
            <button  onClick={()=> handleView("Ice-Creams")}>View</button>
          </div>
          <div className="items">
            <img src="./src/assets/icecream.jpg" alt="Milk Shakes" />
            <p>Milk Shakes</p>
            <button  onClick={()=> handleView("Milk-Shakes")}>View</button>
          </div>
          <button id="cart-sticky-button"><Link to="/cart"><FaShoppingCart size={40} /></Link></button>

        </div>
      </div>
      <div id="footer">
        <footer >
          <h2>Contact Information</h2><br/>
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
            </li><br/>
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

export default Home;
