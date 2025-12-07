import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { saveAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, form);
      saveAuth(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="pt-24 flex justify-center bg-gradient-to-r from-slate-400 to-red-200 h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-gradient-to-r from-slate-400 to-red-200 h-[300px] rounded shadow">
        <h2 className="text-2xl mb-4">Login</h2>
        <input required name="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="mb-3 w-full p-2 border rounded bg-gray-200"/>
        <input required type="password" name="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" className="mb-3 w-full p-2 border rounded bg-gray-200"/>
        <button className="w-full p-2 bg-gray-700 hover:bg-gray-500 text-white rounded">Login</button>
        <div className="text-blue-600"> Allready have Account then -- <a href="/signup">Signup</a></div>
      </form>
    </div>
  );
}
export default Login;
