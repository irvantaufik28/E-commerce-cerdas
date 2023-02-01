import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        getProducts()
    },[])

    const getProducts = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/product')
      
        setProducts(response.data.products.data)
    }

    const deleteProduct = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/v1/product/${id}`)
        getProducts()
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`add`} className="button is-success">Add new</Link>
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
                <Link to={`edit/${product.id}`}  className="button is-small is-info">edit</Link> 
                <button onClick={()=> deleteProduct(product.id) } className="button is-small is-danger">delete</button>
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
