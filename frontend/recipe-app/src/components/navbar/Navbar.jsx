import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import Modal from "../modal/Modal.jsx";
import FormInput from "../formInput/FormInput.jsx";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? true : false);

  useEffect(() => {
    setIsLogin(token ? true : false);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(false);
    } else {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

	const handleLinkClick = (e) => {
		if(!isLogin) {
			e.preventDefault();
			setIsOpen(true)
		}

	}

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <img src={logo} alt="Logo here" width={300} />
          </div>
          <div className="nav-links">
            <ul className="m-0 p-0">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link onClick={handleLinkClick} to={isLogin ? "/myRecipes" : "/"}>My Recipes</Link>
              </li>
              <li>
                <Link onClick={handleLinkClick} to={isLogin ? "/myFavRecipes" : "/"}>Favorites</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
              <li>
                <button onClick={checkLogin}>
                  {isLogin ? "Logout" : "Login"}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {isOpen && (
        <Modal onClose={closeModal}>
          <FormInput />
        </Modal>
      )}
    </>
  );
}
