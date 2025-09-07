// frontend/src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        🛍 MyShop
      </Link>
      <ToastContainer position="top-right" autoClose={2000} />

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/items">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Cart
            </Link>
          </li>

          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
  <button
    className="btn btn-outline-light ms-2"
    onClick={() => {
      setToken(null);
      localStorage.removeItem("token");
      toast.success("Logout success!"); // Use toast.success for green, toast.error for red
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }}
  >
    Logout
  </button>
</li>
  
          )}
        </ul>
      </div>
    </nav>
  );
}
