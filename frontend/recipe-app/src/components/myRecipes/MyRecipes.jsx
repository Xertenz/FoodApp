import axios from "axios";
import { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";

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

  console.log(recipes);

  const onDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/recipes/${id}`);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (error) {
      alert("Error in deleting recipe");
    }
  };

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
                <div className="icons">
                  <a href={`/editRecipe/${recipe._id}`}>
                    <HiMiniPencilSquare className="icon" />
                  </a>
                  <MdDeleteOutline
                    className="icon"
                    onClick={() => onDeleteRecipe(recipe._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
