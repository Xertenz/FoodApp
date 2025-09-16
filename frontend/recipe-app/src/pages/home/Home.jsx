import image1 from "../../assets/recipes-image-1.jpg";
import AllRecipes from "../../components/allrecipes/AllRecipes";

export default function Home() {
  return (
    <div className="home-container">
      <section className="home">
        <div className="left">
          <h1 className="title">Share your favorite recipe with me</h1>
          <p className="description">
            Join our community of food lovers and share your favorite recipes
            with the world. Whether its a family secret or a new creation, we
            want to see it!
          </p>
          <button>Share Your Recipe</button>
        </div>
        <div className="right">
          <img src={image1} className="logo" />
        </div>
      </section>

      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ff5500"
            fillOpacity="1"
            d="M0,96L21.8,90.7C43.6,85,87,75,131,106.7C174.5,139,218,213,262,224C305.5,235,349,181,393,144C436.4,107,480,85,524,101.3C567.3,117,611,171,655,176C698.2,181,742,139,785,106.7C829.1,75,873,53,916,69.3C960,85,1004,139,1047,144C1090.9,149,1135,107,1178,106.7C1221.8,107,1265,149,1309,154.7C1352.7,160,1396,128,1418,112L1440,96L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
          ></path>
        </svg>
      </div>
			<AllRecipes />
    </div>
  );
}
