import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* HERO / BANNER */}
      <section className="about-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>About <span>ZingR Bite</span> 🍔</h1>
          <p>Good Food. Great Taste. Always Fresh!</p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            <strong>ZingR Bite</strong> started with a simple idea — to bring the joy of
            crispy, juicy chicken and fresh fast food to every bite. We began as a small
            kitchen in Kondhwa and quickly became a favorite late-night destination for food lovers.
          </p>
          <p>
            From our signature Chicken Zinger Burger to our mouthwatering Popcorn Chicken,
            every dish is cooked fresh, seasoned perfectly, and served hot with love ❤️.
          </p>
        </div>
        <div className="story-img">
          <img
            src="https://1.bp.blogspot.com/-OB_qqkHk5c0/X5GngtrK9UI/AAAAAAAACuA/yStvtCB4w04tS2_Z1qYpaANWlnp2b4xlwCLcBGAsYHQ/s964/c18.jpg"
            alt="ZingR Bite Burger"
          />
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To serve happiness one bite at a time — using the freshest ingredients, bold
          flavors, and a passion for great food. We’re here to satisfy your cravings,
          whether it’s lunchtime, dinnertime, or midnight snack time.
        </p>
        <div className="mission-points">
          <div className="point-card">
            <h3>🍔 Fresh Ingredients</h3>
            <p>Every meal is made from handpicked, top-quality ingredients.</p>
          </div>
          <div className="point-card">
            <h3>🔥 Hot & Crispy</h3>
            <p>We serve food that’s always cooked to perfection, never reheated.</p>
          </div>
          <div className="point-card">
            <h3>🚀 Fast Delivery</h3>
            <p>Order through WhatsApp, Swiggy, or Zomato — and we’ll handle the rest!</p>
          </div>
        </div>
      </section>

      {/* LOCATION & CONTACT */}
      <section className="about-location">
        <h2>📍 Visit Us</h2>
        <p>Noor Masjid Chowk, Unity Park Road, Kondhwa</p>
        <p>🕒 11:30 AM - 2:30 AM</p>
        <p>📞 7758002642</p>
        <div className="map-container">
          <iframe
            title="ZingR Bite Location"
            src="https://www.google.com/maps?q=Noor+Masjid+Chowk,+Unity+Park+Road,+Kondhwa&output=embed"
            width="100%"
            height="300"
            style={{ border: "none", borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default About;
