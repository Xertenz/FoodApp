import axios from "axios";
import { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/recipe")
      .then((result) => setRecipes(result.data));
  }, []);

  console.log(recipes);

  return (
    <div className="recipes-container">
      <h1>All Recipes</h1>
      <div className="cards-wrapper">
        {recipes.map((recipe, index) => (
          <div key={index} className="card">
            <h4 className="title">{recipe.title}</h4>
            <p className="ingredients">{recipe.ingredients}</p>
            <small className="instructions">{recipe.instructions}</small>
						<IoHeartSharp className="card-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}
