import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name_product, setName_product] = useState("");
  const [price, setPrice] = useState(0);
  const [descripition, setDescripition] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const uploadProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_product", name_product);
    formData.append("price", price);
    formData.append("description", descripition);
    formData.append("image", image);

    
    try {
        await axios.post("http://localhost:3000/api/v1/product", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={uploadProduct}>
          <div className="field">
            <label className="label">Product</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="product name"
                value={name_product}
                onChange={(e) => setName_product(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Rp."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">descripition</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="descripition"
                value={descripition}
                onChange={(e) => setDescripition(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">image</label>
            <div className="control">
              <input
                type="file"
                className="input"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
