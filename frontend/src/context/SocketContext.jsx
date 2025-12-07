import { useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
    
    const [socket] = useState(() =>
        io("http://localhost:5000", { transports: ["polling", "websocket"] })
    );

    const [products, setProducts] = useState([]);

    useEffect(() => {

        // Fetch products from backend (correctly pull 'products' array)
        axios.get("http://localhost:5000/api/products")
            .then((res) => {
                setProducts(res.data); // because backend returns array directly   // FIXED
            })
            .catch((err) => {
                console.error("Fetch products error:", err);
            });

        // Listen for real-time updates
        socket.on("newProduct", (newProduct) => {
            setProducts((prev) => [newProduct, ...prev]);
        });

        return () => {
            socket.off("newProduct");
        };
    }, [socket]); // ADD socket here

    return (
        <SocketContext.Provider value={{ socket, products, setProducts }}>
            {children}
        </SocketContext.Provider>
    );
}
