import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ProductList from "./components/Product/ProductList";
import AddProduct from "./components/Product/AddProduct";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<ProductList/>} />
      <Route path="add" element={<AddProduct/>} />
    </Routes>
  </Router>
  );
}

export default App;
