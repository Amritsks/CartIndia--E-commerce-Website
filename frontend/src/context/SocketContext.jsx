import { useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import.meta.env.VITE_BACKEND_URL


export const SocketContext = createContext();

export function SocketProvider({ children }) {
    
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [socket] = useState(() =>
    io(BACKEND_URL, { transports: ["polling", "websocket"] })
    );

    const [products, setProducts] = useState([]);

    useEffect(() => {
    axios.get(`${BACKEND_URL}/api/products`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error("Fetch products error:", err));

    socket.on("newProduct", (newProduct) => {
        setProducts((prev) => [newProduct, ...prev]);
    });

    return () => socket.off("newProduct");
}, [socket]); // ADD socket here

    return (
        <SocketContext.Provider value={{ socket, products, setProducts }}>
            {children}
        </SocketContext.Provider>
    );
}
