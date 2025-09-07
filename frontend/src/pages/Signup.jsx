// frontend/src/pages/Signup.jsx
import React, { useState } from "react";
import API from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      toast.success("Signup success! Please login.");
      setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
    } catch (err) {
      alert("Signup failed!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
       <ToastContainer position="top-right" autoClose={2000} />
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
