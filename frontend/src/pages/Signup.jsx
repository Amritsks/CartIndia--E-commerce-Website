import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { saveAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, form);
      saveAuth(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="pt-24 flex justify-center bg-gradient-to-r from-slate-400 to-red-200 h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-gradient-to-r from-slate-400 to-red-200 h-[300px] rounded shadow">
        <h2 className="text-2xl mb-4">Create Account</h2>
        <input required name="name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="mb-3 w-full p-2 border rounded"/>
        <input required name="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="mb-3 w-full p-2 border rounded"/>
        <input required type="password" name="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" className="mb-3 w-full p-2 border rounded"/>
        <button className="w-full p-2 bg-gray-700 hover:bg-gray-500 text-white rounded">Sign up</button>
      </form>
    </div>
  );
}
export default Signup;
