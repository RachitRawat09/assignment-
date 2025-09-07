// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import API from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login success!");
      setTimeout(() => {
      window.location.href = "/items";
    }, 1500);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
       <ToastContainer position="top-right" autoClose={2000} />
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
