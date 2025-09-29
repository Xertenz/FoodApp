import axios from "axios";
import { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/recipes")
      .then((result) => setRecipes(result.data));
  }, []);

  return (
    <div className="recipes-container">
      <h1 className="all-recipes-title text-center my-5">All Recipes</h1>
      <div className="cards-wrapper mb-5">
        <div className="container">
          <div className="cards">
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
      </div>
    </div>
  );
}
