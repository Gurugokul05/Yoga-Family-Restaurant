import React from 'react'
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminFoodListForChangePrice = () => {
  const navigate = useNavigate();
    const handleView = (category) => {
      navigate(`/food-list-for-price-change/${category.toLowerCase()}`);
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
          <div id="mainintro">
            <h1>Welcome to Yoga Family Restaurant</h1>
          </div>
          <div id="food-list">
            <div className="items">
              <img src="./src/assets/IMG_20250719_191256.jpg" alt="Biryani" />
              <p>Biryani</p>
              <button onClick={() => handleView("Biryani")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/parrota.jpg" alt="Parotta & Chappathi" />
              <p>Parotta & Chappathi</p>
              <button onClick={() => handleView("Parotta")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/naan.jpg" alt="Rotti/Naan" />
              <p>Rotti/Naan</p>
              <button onClick={() => handleView("Naan")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/fried_rice.jpg" alt="Fried Rice" />
              <p>Fried Rice</p>
              <button onClick={() => handleView("Fried-Rice")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/noodles.jpg" alt="Fried Noodles" />
              <p>Fried Noodles</p>
              <button onClick={() => handleView("Fried-Noodles")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/dosa.jpg" alt="Dosa" />
              <p>Dosa</p>
              <button onClick={() => handleView("Dosa")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/chicken_gravy.jpg" alt="Chicken Gravy" />
              <p>Chicken Gravy</p>
              <button onClick={() => handleView("Chicken-Gravy")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/egg_gravy.jpg" alt="Egg" />
              <p>Egg</p>
              <button onClick={() => handleView("Egg")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/veg_gravy.jpg" alt="Veg Gravy" />
              <p>Veg Gravy</p>
              <button onClick={() => handleView("Veg-Gravy")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/grill_chicken.jpg" alt="Grill/Tandoori" />
              <p>Grill/Tandoori</p>
              <button onClick={() => handleView("Grill")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/soup.jpg" alt="Soup" />
              <p>Soup</p>
              <button onClick={() => handleView("Soup")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/starters.jpg" alt="Starters" />
              <p>Starters</p>
              <button onClick={() => handleView("Starters")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/burger.jpg" alt="Burger/Sandwich" />
              <p>Burger/Sandwich</p>
              <button onClick={() => handleView("Burger")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/shawarma.jpg" alt="Shawarma/Rolls/Wraps" />
              <p>Shawarma/Rolls/Wraps</p>
              <button onClick={() => handleView("Shawarma")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/pizza.jpg" alt="Pizza" />
              <p>Pizza</p>
              <button onClick={() => handleView("Pizza")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/fried_chicken.jpg" alt="Fried Chicken" />
              <p>Fried Chicken</p>
              <button onClick={() => handleView("Fried-Chicken")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/juice.jpg" alt="Mojito/Fresh Juice" />
              <p>Mojito/Fresh Juice</p>
              <button onClick={() => handleView("Fresh-Juice")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/icecream.jpg" alt="Ice Creams" />
              <p>Ice Creams</p>
              <button onClick={() => handleView("Ice-Creams")}>View</button>
            </div>
            <div className="items">
              <img src="./src/assets/icecream.jpg" alt="Milk Shakes" />
              <p>Milk Shakes</p>
              <button onClick={() => handleView("Milk-Shakes")}>View</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AdminFoodListForChangePrice