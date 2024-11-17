import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages";
import Test from "./pages/test";
import ProductsIndex from "./pages/products";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Index/>} />
        <Route path="test" element={<Test/>} />
        <Route path="admin" element={<Layout/>}>
          <Route path="products" element={<ProductsIndex/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
