import Img1 from "../assets/Slidings/one.png";
import Img2 from "../assets/Slidings/two.png";
import Img3 from "../assets/Slidings/three.png";
import Img4 from "../assets/Slidings/four.png";

import { ChevronRight, X } from "react-feather";
import { useState } from "react";
import {useContext} from "react";
import { SocketContext } from "../context/SocketContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const slidingimages = [Img1, Img2, Img3, Img4];

function Dashboard() {
  const [index, setIndex] = useState(0);
  const {products} = useContext(SocketContext);
  const [direction, setDirection] = useState("right");
  const {user} = useContext(AuthContext);

  const nextslide = () => {
    setIndex((prev) => (prev + 1) % slidingimages.length);
    setDirection("right");
  };

  const prevslide = () => {
    setIndex((prev) => (prev - 1 + slidingimages.length) % slidingimages.length);
    setDirection("left");
  };
    let touchStart = 0;
    let touchEnd = 0;

    const handleSwipe = () => {
      if (touchStart - touchEnd > 50) {
        // Swipe LEFT → next slide
        nextslide();
      }

      if (touchEnd - touchStart > 50) {
        // Swipe RIGHT → previous slide
        prevslide();
      }
    };

  return (
    <div className="p-2 pt-20 bg-gradient-to-r from-slate-400 to-red-200 min-h-screen">
      <h1 className="flex justify-center text-[40px] mb-2 text-gray-700">Welcome, {user?.name || "Guest"} </h1>

      {/* ---------- Slider Section ---------- */}
      <section
        className="relative w-full overflow-hidden flex flex-col items-center"
        onTouchStart={(e) => (touchStart = e.touches[0].clientX)}
        onTouchMove={(e) => (touchEnd = e.touches[0].clientX)}
        onTouchEnd={() => handleSwipe()}>

        {/* Image */}
        <div
          key={index}
          className={`
            w-full bg-contain bg-no-repeat bg-center transition-all duration-700
            ${direction === "right" ? "animate-slideRight" : "animate-slideLeft"}
            h-[260px] sm:h-[400px] md:h-[530px]
          `}
          style={{ backgroundImage: `url(${slidingimages[index]})` }}
        />

        {/* Left Button (hidden on mobile) */}
        <button
          onClick={prevslide}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 
            w-16 h-16 bg-white/70 rounded-full shadow-md justify-center 
            items-center backdrop-blur-sm hover:scale-110 transition"
        >
          <ChevronRight className="w-10 h-10 rotate-180 text-gray-500" strokeWidth={3} />
        </button>

        {/* Right Button (hidden on mobile) */}
        <button
          onClick={nextslide}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 
            w-16 h-16 bg-white/70 rounded-full shadow-md justify-center 
            items-center backdrop-blur-sm hover:scale-110 transition"
        >
          <ChevronRight className="w-10 h-10 text-gray-500" strokeWidth={3} />
        </button>

        {/* Dots (mobile only) */}
        <div className="flex sm:hidden gap-2 mt-3">
          {slidingimages.map((_, i) => (
            <span
              key={i}
              className={`h-3 w-3 rounded-full transition-all ${
                i === index ? "bg-blue-600 scale-110" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>




      {/* Product List */}
      <section className="mt-1">
        <div>
          <h2 className="text-[30px] font-serif text-cyan-700 flex justify-center ">
            🛍️ Product Catalog:
          </h2>

          {products.length === 0 ? (
            <p>No Products Found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-4 ">
              {products.map((p) => (
              <Link key={p._id} to={`/product/${p._id}`}>
                <div className="border p-4 bg-gray-200 rounded-xl shadow-md flex flex-col">
                  <img
                    className="h-40 w-full object-contain rounded-lg bg-slate-100"
                    src={p.imageUrl}
                    alt={p.name}
                  />
                </div>
              </Link>
            ))}

            </div>
          )}
        </div>
      </section>

      {/*Copyright Tag*/}
      <section className="mt-3">
        <footer className="flex justify-center">
          <h2 className=" text-red-800 text-lg font-bold">© {new Date().getFullYear()} CartꞮndia. All rights reserved.</h2>
        </footer>
      </section>

    </div>
  );
}

export default Dashboard;
