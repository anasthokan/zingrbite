import React, { useEffect, useState } from "react";
import "./Offers.css";

function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

   const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "" // empty = same domain (for Render)
    : "http://localhost:5000";


  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/offers`);
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) {
    return <h2 className="loading">Loading offers...</h2>;
  }

  return (
    <div className="offers-page">
      <div className="offers-banner">
        <div className="overlay"></div>
        <div className="banner-content">
          <h1>🔥 Special Combo Offers 🔥</h1>
          <p>
            Enjoy delicious food at pocket-friendly prices only at{" "}
            <strong>ZingR Bite</strong>!
          </p>
        </div>
      </div>

      <section className="offers-section">
        <div className="offers-grid">
          {offers.map((offer) => (
            <div key={offer._id} className="offer-card">
              <img src={offer.img} alt={offer.name} />
              <div className="offer-details">
                <h3>{offer.name}</h3>
                <p className="desc">{offer.desc}</p>
                <p className="price">{offer.price}</p>
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
      </section>
    </div>
  );
}

export default Offers;
