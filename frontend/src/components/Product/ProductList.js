import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  // const [orderBy, setOrderBy] = useState("")
  // const [orderDir, setOrderDir] = useState("")
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("")

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword]);

  const getProducts = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/product?q=${keyword}&record=${limit}&page=${page}`
    );
    console.log(response);
    setProducts(response.data.products.data);
    setPage(response.data.products.pagination.page);
    setLimit(response.data.products.pagination.limit);
    setPages(response.data.products.pagination.totalPage);
    setRows(response.data.products.pagination.totalRow);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const searchProduct = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query)
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/product/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-fullWidth">
        <form onSubmit={searchProduct}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input type="text" 
              className="input"
              value={query} 
              onChange={(e)=> setQuery(e.target.value)}
              placeholder="search..." />
            </div>
            <div className="control">
              <button type="submit" className="button is-info"> search</button>
            </div>
          </div>
        </form>
        <Link to={`add`} className="button is-success mt-5">
          Add new
        </Link>
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
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name_product}</td>
                <td>{product.price}</td>
                <td>{product.descripition}</td>
                <td>
                  {" "}
                  <img
                    src={product.image}
                    width={250}
                    height={250}
                    alt="icons"
                  />
                </td>
                <td>
                  <Link
                    to={`edit/${product.id}`}
                    className="button is-small is-info"
                  >
                    edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="button is-small is-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Total Rows: {rows} page: {rows ? page + 1 : 0} of {pages}
        </p>
        <nav
          className="pagination is-centered"
          key={rows}
          role="navigation"
          arial-label="pagination"
        >
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"next >"}
            pageCount={Math.min(10, pages)}
            onPageChange={changePage}
            containerClassName={"pagination-list"}
            pageLinkClassName={"pagination-link"}
            previousLinkClassName={"pagination-previous"}
            nextLinkClassName={"pagination-next"}
            activeLinkClassName={"pagination-link is-current"}
            disabledLinkClassName={"pagination-link is-disable"}
          />
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
