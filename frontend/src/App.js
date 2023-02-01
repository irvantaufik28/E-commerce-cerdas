import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/Login";
import Product from "./pages/Product/ProductPage";
import AddProductPage from "./pages/Product/AddProductPage";
import EditProductPage from "./pages/Product/EditProductPage";


function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/product" element={<Product/>} />
      <Route path="/product/add" element={<AddProductPage/>} />
      <Route path="/product/edit/:id" element={<EditProductPage/>} />
    </Routes>
  </Router>
  );
}

export default App;
