import React, { useEffect, useState } from "react";
import "./Dashboard.css";

// ✅ Detect environment (local vs production)
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "" // empty → same domain (Render live site)
    : "http://localhost:5000";

function Dashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState("");
  const [editData, setEditData] = useState({});
  const [newItem, setNewItem] = useState({
    type: "",
    name: "",
    price: "",
    category: "",
    desc: "",
    image: "",
  });

  // ✅ Fetch all data (menu, offers, contact)
  const fetchAllData = async () => {
    try {
      const [menuRes, offerRes, contactRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/menu`),
        fetch(`${API_BASE_URL}/api/offers`),
        fetch(`${API_BASE_URL}/api/contact`),
      ]);

      const menuData = await menuRes.json();
      const offerData = await offerRes.json();
      const contactData = await contactRes.json();

      setMenuItems(menuData);
      setOffers(offerData);
      setContacts(contactData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ✅ Handle editing
  const startEdit = (item, type) => {
    setEditId(item._id);
    setEditType(type);
    setEditData({ ...item });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/${editType}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      alert(data.message || "Item updated!");
      cancelEdit();
      fetchAllData();
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

  // ✅ Delete items
  const deleteItem = async (id, type) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await fetch(`${API_BASE_URL}/api/${type}/${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm("Delete this contact message?")) {
      await fetch(`${API_BASE_URL}/api/contact/${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // ✅ Add new item
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addNewItem = async () => {
    if (!newItem.type) {
      alert("Please select type (menu or offer)");
      return;
    }

    const url =
      newItem.type === "menu"
        ? `${API_BASE_URL}/api/menu`
        : `${API_BASE_URL}/api/offers`;

    const body =
      newItem.type === "menu"
        ? {
            name: newItem.name,
            price: newItem.price,
            category: newItem.category,
            image: newItem.image,
          }
        : {
            name: newItem.name,
            price: newItem.price,
            img: newItem.image,
            desc: newItem.desc,
          };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      alert(data.message || "New item added!");
      setNewItem({
        type: "",
        name: "",
        price: "",
        category: "",
        desc: "",
        image: "",
      });
      fetchAllData();
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  if (loading) return <h2 className="loading">Loading Dashboard...</h2>;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">📊 Admin Dashboard</h1>

      {/* ADD NEW ITEM */}
      <div className="add-form">
        <h2>➕ Add New Item</h2>
        <select name="type" value={newItem.type} onChange={handleNewChange}>
          <option value="">Select Type</option>
          <option value="menu">Menu</option>
          <option value="offers">Offer</option>
        </select>
        <input name="name" placeholder="Name" value={newItem.name} onChange={handleNewChange} />
        <input name="price" placeholder="Price" value={newItem.price} onChange={handleNewChange} />
        {newItem.type === "menu" && (
          <input
            name="category"
            placeholder="Category"
            value={newItem.category}
            onChange={handleNewChange}
          />
        )}
        {newItem.type === "offers" && (
          <textarea
            name="desc"
            placeholder="Description"
            value={newItem.desc}
            onChange={handleNewChange}
          />
        )}
        <input
          name="image"
          placeholder="Image URL"
          value={newItem.image}
          onChange={handleNewChange}
        />
        <button className="add-btn" onClick={addNewItem}>
          Add
        </button>
      </div>

      {/* MENU TABLE */}
      <section className="dashboard-section">
        <h2>🍔 Menu Items</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) =>
              editId === item._id && editType === "menu" ? (
                <tr key={item._id} className="editing-row">
                  <td><input name="name" value={editData.name} onChange={handleEditChange} /></td>
                  <td><input name="category" value={editData.category} onChange={handleEditChange} /></td>
                  <td><input name="price" value={editData.price} onChange={handleEditChange} /></td>
                  <td>
                    <button className="save-btn" onClick={saveEdit}>💾</button>
                    <button className="cancel-btn" onClick={cancelEdit}>❌</button>
                  </td>
                </tr>
              ) : (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button className="edit-btn" onClick={() => startEdit(item, "menu")}>✏️</button>
                    <button className="delete-btn" onClick={() => deleteItem(item._id, "menu")}>🗑️</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      {/* OFFERS TABLE */}
      <section className="dashboard-section">
        <h2>🎁 Offers</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) =>
              editId === offer._id && editType === "offers" ? (
                <tr key={offer._id} className="editing-row">
                  <td><input name="name" value={editData.name} onChange={handleEditChange} /></td>
                  <td><input name="price" value={editData.price} onChange={handleEditChange} /></td>
                  <td>
                    <button className="save-btn" onClick={saveEdit}>💾</button>
                    <button className="cancel-btn" onClick={cancelEdit}>❌</button>
                  </td>
                </tr>
              ) : (
                <tr key={offer._id}>
                  <td>{offer.name}</td>
                  <td>{offer.price}</td>
                  <td>
                    <button className="edit-btn" onClick={() => startEdit(offer, "offers")}>✏️</button>
                    <button className="delete-btn" onClick={() => deleteItem(offer._id, "offers")}>🗑️</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      {/* CONTACT TABLE */}
      <section className="dashboard-section">
        <h2>📩 Contact Messages</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteContact(msg._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Dashboard;
