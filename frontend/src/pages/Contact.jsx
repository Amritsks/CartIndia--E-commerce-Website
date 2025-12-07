import { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Optional: send to backend if you want
      await axios.post(`${BACKEND_URL}/api/contact`, form);

      setSuccess(true);

      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.log("Contact Error:", err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-r from-slate-400 to-red-200 flex justify-center items-center px-5 ">
      <div className="bg-gradient-to-r from-slate-400 to-red-200 shadow-lg rounded-2xl p-10 w-full max-w-3xl">

        <h1 className="text-4xl font-bold text-center text-gray-500 mb-8">
          📩 Contact Us
        </h1>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">📞 Get in Touch</h2>
            <p className="text-gray-700">
              Have a question or need help? We would love to hear from you!
            </p>

            <p className="text-lg font-semibold">📍 Address:</p>
            <p className="text-gray-700">CartꞮndia HQ, Jaipur, Rajasthan, India</p>

            <p className="text-lg font-semibold">📧 Email:</p>
            <p className="text-gray-700">support@cartindia.com</p>

            <p className="text-lg font-semibold">📱 Phone:</p>
            <p className="text-gray-700">+91 8051267769</p>

            {/* Social */}
            <div className="flex gap-4 mt-4">
              <a className="text-blue-600 text-3xl hover:scale-110 transition" href="https://portfolio-nine-gules-5ifv7xva72.vercel.app/">
                🌐
              </a>
              <a className="text-blue-400 text-3xl hover:scale-110 transition" href="https://www.linkedin.com/in/amritshrivastav/">
                <h1 className="bg-blue-700 rounded-md">
                  <div className="text-white p-1 font-bold h-10">in</div>
                </h1>
              </a>
            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-gradient-to-r from-slate-400 to-red-200 p-6 rounded-xl shadow-lg"
          >
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-200"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-200"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="border p-3 h-32 rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-200"
              required
            />

            <button
              type="submit"
              className="bg-gray-500 text-white py-3 rounded-lg text-lg hover:bg-gray-700 transition"
            >
              Send Message
            </button>

            {success && (
              <p className="text-green-600 text-center font-semibold mt-2 animate-pulse">
                ✔️ Message Sent Successfully!
              </p>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}

export default Contact;
