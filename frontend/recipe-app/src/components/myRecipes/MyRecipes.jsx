import axios from "axios";
import { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      const { data } = await axios.get("http://127.0.0.1:3000/recipes");
      const myRecipes = data.filter((recipe) => recipe.createdBy === user._id);
      setRecipes(myRecipes);
    };
    fetchMyRecipes();
  }, []);

  return (
    <div>
      {recipes.length == 0 ? (
        <p>No recipes found</p>
      ) : (
        <div className="container recipes-container">
          <h1>All Recipes</h1>
          <div className="cards-wrapper">
            {recipes.map((recipe, index) => (
              <div key={index} className="card">
                <h4 className="title">{recipe.title}</h4>
                <img
                  src={`http://127.0.0.1:3000/public/images/${recipe.coverImage}`}
                />
                <p className="ingredients">{recipe.ingredients}</p>
                <small className="instructions">{recipe.instructions}</small>
                <IoHeartSharp className="card-icon" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
