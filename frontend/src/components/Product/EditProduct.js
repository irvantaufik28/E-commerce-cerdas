import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name_product, setName_product] = useState("");
  const [price, setPrice] = useState(0);
  const [descripition, setDescripition] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_product", name_product);
    formData.append("price", price);
    formData.append("descripition", descripition);
    formData.append("image", image);
    try {
      await axios.put(`http://localhost:3000/api/v1/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getProductById = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/product/${id}`
    );
    setName_product(response.data.product.name_product);
    setPrice(response.data.product.price);
    setDescripition(response.data.product.descripition);
    setImage(response.data.product.image);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateProduct}>
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
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
