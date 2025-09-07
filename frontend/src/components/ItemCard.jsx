import React from "react";

export default function ItemCard({ item, onAdd }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">Category: {item.category}</p>
        <p className="card-text fw-bold">₹{item.price}</p>
        <button
          className="btn btn-success mt-auto"
          onClick={() => onAdd(item._id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
