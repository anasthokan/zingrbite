import React, { useEffect, useState } from "react";
import "./Menu.css";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu");
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) {
    return <h2 className="loading">Loading menu...</h2>;
  }

  return (
    <div className="menu-page">
      <h1 className="menu-title">🍔 Our Menu</h1>
      <div className="menu-grid">
        {menu.map((item) => (
          <div key={item._id} className="menu-card">
            <img src={item.image} alt={item.name} />
            <div className="menu-info">
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="price">₹{item.price}</p>
              <button
                className="order-btn"
                onClick={() => window.open("https://wa.me/7758002642", "_blank")}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
