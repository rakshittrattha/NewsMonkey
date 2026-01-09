import React from "react";
import "./Navbar.css";

const categories = ["technology", "finance", "politics", "geology"];

const Navbar = ({ category, setCategory }) => {
  return (
    <div className="category-bar">
      <div className="logo">NewsMonkey 🐒</div>

      <div className="categories">
        {categories.map(cat => (
          <span
            key={cat}
            className={`category-item ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
