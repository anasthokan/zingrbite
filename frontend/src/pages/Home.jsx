import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Welcome to <span>ZingR Bite</span> 🍔</h1>
          <p>Serving happiness from 11:30 AM to 2:30 AM — Hot, Crispy & Delicious!</p>
          <div className="hero-buttons">
            <button
              className="menu-btn"
              onClick={() => (window.location.href = "/menu")}
            >
              View Menu
            </button>
            <button
              className="order-btn"
              onClick={() => window.open("https://wa.me/7758002642", "_blank")}
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* OFFER SECTION */}
      <section className="offers-section">
        <h2>🔥 Today’s Combo Offers 🔥</h2>
        <div className="offers-grid">
          {[
            {
              name: "Zinger Burger + Fries + Coke",
              price: "₹179",
              img: "https://1.bp.blogspot.com/-OB_qqkHk5c0/X5GngtrK9UI/AAAAAAAACuA/yStvtCB4w04tS2_Z1qYpaANWlnp2b4xlwCLcBGAsYHQ/s964/c18.jpg",
            },
            {
              name: "Popcorn Chicken + Drink",
              price: "₹149",
              img: "https://i0.wp.com/www.melissassouthernstylekitchen.com/wp-content/uploads/2019/06/EasyPopcornChicken003.jpg?fit=1484%2C2120&ssl=1",
            },
            {
              name: "Momos + Mojito",
              price: "₹139",
              img: "https://dumplinghouse.in/wp-content/uploads/2023/07/Mojito.png  ",
            },
          ].map((offer, index) => (
            <div className="offer-card" key={index}>
              <img src={offer.img} alt={offer.name} />
              <div className="offer-info">
                <h3>{offer.name}</h3>
                <p>{offer.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <h2>Why Choose ZingR Bite?</h2>
        <p>
          At <strong>ZingR Bite</strong>, we believe food should be full of flavor, freshness,
          and love ❤️. Whether it’s a juicy chicken zinger, crunchy fries, or
          sweet caramel dessert — we make sure every bite brings joy to your plate!
        </p>

        <div className="info-cards">
          <div className="info-card">
            <h3>⏰ Late Night Service</h3>
            <p>Open till 2:30 AM — perfect for your midnight cravings!</p>
          </div>
          <div className="info-card">
            <h3>🍗 Fresh Ingredients</h3>
            <p>Every dish is cooked fresh to keep that perfect crunch and flavor.</p>
          </div>
          <div className="info-card">
            <h3>📦 Fast Delivery</h3>
            <p>Get your order delivered via Swiggy, Zomato, or WhatsApp.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
