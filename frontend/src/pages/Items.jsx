import React, { useState, useEffect, useContext } from "react";
import API from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";
import ItemCard from "../components/ItemCard.jsx";
import { toast, ToastContainer } from "react-toastify";

export default function Items() {
  const { setCart } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get("/items", { params: filters });
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, [filters]);

  const addToCart = async (id) => {
    try {
      const res = await API.post("/cart/add", { itemId: id });
      setCart(res.data.items);
       toast.success("Item added to cart!");
    } catch (err) {
       toast.error("Error adding to cart!");
    }
  };

  return (
    <div className="container my-4">
       <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-center mb-4">🛍️ Available Items</h2>

      {/* Filters */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Filter Items</h5>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value.toLowerCase()})

              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Min Price"
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Max Price"
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={() => setFilters({ ...filters })}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="row">
        {items.length > 0 ? (
          items.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <ItemCard item={item} onAdd={addToCart} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No items found</p>
        )}
      </div>
    </div>
  );
}
