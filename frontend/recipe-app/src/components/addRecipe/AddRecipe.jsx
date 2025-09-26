import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
		if(!localStorage.getItem("token")) {
			navigate("/")
		}
  }, []);

  const handleChange = (e) => {
    let val;
    if (e.target.name == "ingredients") {
      val = e.target.value.split(",");
    } else if (e.target.name == "coverImage") {
      val = e.target.files[0];
    } else {
      val = e.target.value;
    }

    setRecipe((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("title", recipe.title);
      formData.append("ingredients", recipe.ingredients);
      formData.append("instructions", recipe.instructions);

      if (recipe.coverImage) {
        formData.append("coverImage", recipe.coverImage);
      }
      await axios.post("http://127.0.0.1:3000/recipes/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container my-5 add-recipe">
      <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <input
            onChange={handleChange}
            className="form-control rounded-0"
            type="text"
            name="title"
            placeholder="title"
          />
        </div>
        <div className="mb-3">
          <input
            onChange={handleChange}
            className="form-control rounded-0"
            type="text"
            name="ingredients"
            placeholder="ingredients"
          />
        </div>
        <div className="mb-3">
          <input
            onChange={handleChange}
            className="form-control rounded-0"
            type="text"
            name="instructions"
            placeholder="instructions"
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            name="coverImage"
            onChange={handleChange}
            className="form-control rounded-0"
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary rounded-0 add-recipe-submit"
          >
            Add
          </button>
        </div>
      </form>
      <p className="text-danger my-2">{error}</p>
    </div>
  );
}
