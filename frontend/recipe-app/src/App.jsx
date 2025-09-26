import Home from "./pages/home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MyRecipes from "./components/myRecipes/MyRecipes";
import MyFavRecipes from "./components/myFavRecipes/MyFavRecipes";
import AddRecipe from "./components/addRecipe/AddRecipe";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/myRecipes" element={<MyRecipes />} />
        <Route path="/myFavRecipes" element={<MyFavRecipes />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
      </Routes>
			<Footer />
    </BrowserRouter>
  );
}
