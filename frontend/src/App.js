import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ProductList from "./components/Product/ProductList";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/Login";


function App() {
  return (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/product" element={<ProductList/>} />
      <Route path="add" element={<AddProduct/>} />
      <Route path="edit/:id" element={<EditProduct/>} />
    </Routes>
  </Router>
  );
}

export default App;
