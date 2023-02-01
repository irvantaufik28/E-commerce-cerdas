import React, { useState, useEffect } from "react";
import axios from "axios";
const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        getProducts()
    },[])

    const getProducts = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/product')
        setProducts(response.data.products.data)
    }
  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Product</th>
              <th>Price</th>
              <th>Descripition</th>
              <th>image</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index)=>(

            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name_product}</td>
              <td>{product.price}</td>
              <td>{product.descripition}</td>
              <td>  <img src={product.image} width={250} height={250} alt="icons" /></td>
              <td>
                <button className="button is-small is-info">edit</button> 
                <button className="button is-small is-danger">delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
