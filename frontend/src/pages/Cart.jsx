// frontend/src/pages/Cart.jsx
import React, { useEffect, useContext } from "react";
import API from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Cart() {
  const { cart, setCart } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");
        setCart(res.data.items);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [setCart]);

  const removeFromCart = async (id) => {
    try {
      const res = await API.post("/cart/remove", { itemId: id });
      setCart(res.data.items);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {cart?.length === 0 ? (
        <div className="alert alert-info text-center">No items in cart</div>
      ) : (
        <div className="list-group">
          {cart?.map((c) => (
            <div
              key={c.item._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{c.item.name}</h5>
                <small className="text-muted">
                  Quantity: <b>{c.quantity}</b>
                </small>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(c.item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
