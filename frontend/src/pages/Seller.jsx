
import { useState, useContext } from "react";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  

function Seller()
{
    const [file, setfile] = useState(null);
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
    const [customerreview, setcustomerreview] = useState("");
    const { products, setProducts } = useContext(SocketContext);

    const handleupload = async (e) =>
    {
        e.preventDefault();

        if(!file||!name||!price||!description||!customerreview)
        {
            alert("Please Fill All the Feild");
            return;
        }

        const formdata = new FormData();
        formdata.append("image", file);
        formdata.append("name", name);
        formdata.append("price", price);
        formdata.append("description", description);
        formdata.append("customerreview", customerreview);

        try{
            await axios.post(`${BACKEND_URL}/api/products/upload/`, formdata);
            setfile(null);
            setname("");
            setprice("");
            setdescription("");
            setcustomerreview("");
            alert("Product added Successfully.");
        }
        catch(error)
        {
            console.error("Upload Error: ", error);
        }
    };
    return(
        <section className="min-h-screen flex justify-center items-center bg-gradient-to-r from-slate-400 to-red-200 px-4 mt-12">
  <form
    onSubmit={handleupload}
    className="bg-gradient-to-r from-slate-400 to-red-200 text-slate-700 flex flex-col gap-4 text-lg w-full max-w-lg p-6 rounded-md shadow-lg"
  >
    <h2>Upload Products Here 👇.</h2>
    <input
      type="file"
      onChange={(e) => setfile(e.target.files[0])}
      accept="image/*"
      className="border rounded-md p-2 bg-gray-200"
    />
    <input
      type="text"
      placeholder="Enter Product name"
      value={name}
      onChange={(e) => setname(e.target.value)}
      className="border rounded-md p-2 bg-gray-200"
    />
    <input
      type="number"
      placeholder="Enter Price"
      value={price}
      onChange={(e) => setprice(e.target.value)}
      className="border rounded-md p-2 bg-gray-200"
    />
    <textarea
      placeholder="Enter Product Description.."
      value={description}
      onChange={(e) => setdescription(e.target.value)}
      className="border rounded-md p-2 bg-gray-200 resize-y"
      rows={4}
    />
    <input
      type="text"
      placeholder="Enter customer Reviews.."
      value={customerreview}
      onChange={(e) => setcustomerreview(e.target.value)}
      className="border rounded-md p-2 bg-gray-200"
    />
    <button
      type="submit"
      className="bg-blue-700 text-white p-2 rounded-md w-full max-w-xs mx-auto"
    >
      Upload Product
    </button>
  </form>
</section>

    )
}

export default Seller;