import React from "react";

function Footer() {
  return (
    <footer style={{ background: "#000", color: "white", textAlign: "center", padding: "15px", marginTop: "40px" }}>
      <p>© {new Date().getFullYear()} ZingR Bite | Follow us on Instagram @zingr_bite</p>
    </footer>
  );
}

export default Footer;
