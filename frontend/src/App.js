import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ProductList from "./components/Product/ProductList";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<ProductList/>} />
      <Route path="add" element={<AddProduct/>} />
      <Route path="edit/:id" element={<EditProduct/>} />
    </Routes>
  </Router>
  );
}

export default App;
