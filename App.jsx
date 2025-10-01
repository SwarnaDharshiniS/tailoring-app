import React, { useState } from "react";
import "./Style.css";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TailoringStitcher />);

function TailoringStitcher() {
  const [item, setItem] = useState("");
  const [addons, setAddons] = useState({
    lining: false,
    embroidery: false,
    buttons: false,
  });
  const [delivery, setDelivery] = useState("");
  const [total, setTotal] = useState(null);

  // Base prices for items
  const itemPrices = {
    A: 300,
    B: 500,
    C: 700,
    D: 1000,
  };

  // Add-on prices
  const addonPrices = {
    lining: 100,
    embroidery: 200,
    buttons: 50,
  };

  // Function to calculate total cost
  const calculateCost = () => {
    if (item === "") {
      alert("Please select an item!");
      return;
    }
    if (delivery === "") {
      alert("Please select delivery type!");
      return;
    }

    let cost = itemPrices[item]; // base price

    // If statement for addons
    if (addons.lining) cost += addonPrices.lining;
    if (addons.embroidery) cost += addonPrices.embroidery;
    if (addons.buttons) cost += addonPrices.buttons;

    // Radio button check
    if (delivery === "urgent") {
      cost += 150; // urgent charge
    }

    setTotal(cost);
  };

  // Handle addon changes
  const handleAddonChange = (e) => {
    const { name, checked } = e.target;
    setAddons((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="container">
      <h2>👗 Tailoring Stitcher Cost Calculator</h2>
      <p className="desc">
        Select an item for stitching, choose extra add-ons, and pick delivery type. 
      </p>

      {/* Dropdown for Items */}
      <div className="card">
        <label className="label">Select Item:</label>
        <select
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="dropdown"
        >
          <option value="">--Select--</option>
          <option value="A">Item A - ₹300</option>
          <option value="B">Item B - ₹500</option>
          <option value="C">Item C - ₹700</option>
          <option value="D">Item D - ₹1000</option>
        </select>
      </div>

      {/* Checkboxes for Addons */}
      <div className="card">
        <label className="label">Add-ons:</label>
        <div className="options">
          <label>
            <input
              type="checkbox"
              name="lining"
              checked={addons.lining}
              onChange={handleAddonChange}
            />{" "}
            Lining (+₹100)
          </label>
          <label>
            <input
              type="checkbox"
              name="embroidery"
              checked={addons.embroidery}
              onChange={handleAddonChange}
            />{" "}
            Embroidery (+₹200)
          </label>
          <label>
            <input
              type="checkbox"
              name="buttons"
              checked={addons.buttons}
              onChange={handleAddonChange}
            />{" "}
            Extra Buttons (+₹50)
          </label>
        </div>
      </div>

      {/* Radio buttons for Delivery */}
      <div className="card">
        <label className="label">Delivery Type:</label>
        <div className="options">
          <label>
            <input
              type="radio"
              name="delivery"
              value="normal"
              checked={delivery === "normal"}
              onChange={(e) => setDelivery(e.target.value)}
            />{" "}
            Normal Delivery (Free)
          </label>
          <label>
            <input
              type="radio"
              name="delivery"
              value="urgent"
              checked={delivery === "urgent"}
              onChange={(e) => setDelivery(e.target.value)}
            />{" "}
            Urgent Delivery (+₹150)
          </label>
        </div>
      </div>

      <button className="btn" onClick={calculateCost}>
        Calculate Cost
      </button>

      {total !== null && (
        <h3 className="result">Total Stitching Cost: ₹{total}</h3>
      )}
    </div>
  );
}

export default TailoringStitcher;
