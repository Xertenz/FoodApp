import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import Modal from "../modal/Modal.jsx";
import FormInput from "../formInput/FormInput.jsx";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? true : false);
  const [navListShown, setNavListshown] = useState(false);

  useEffect(() => {
    setIsLogin(token ? true : false);
  }, [token]);

  const checkLogin = () => {
    setNavListshown(false);
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
    setNavListshown(false);
    if (!isLogin) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <>
      <header className="mb-5">
        <div className="container">
          <nav>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Logo here" width={300} />
              </Link>
            </div>
            <div
              className="hamburger"
              onClick={() => setNavListshown(!navListShown)}
            >
              {navListShown ? <RxCross2 /> : <IoMenu />}
            </div>
            <div className={`nav-links ${navListShown ? "shown" : "unshown"}`}>
              <ul className="m-0 p-0">
                <li>
                  <Link to="/" onClick={() => setNavListshown(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleLinkClick}
                    to={isLogin ? "/myRecipes" : "/"}
                  >
                    My Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleLinkClick}
                    to={isLogin ? "/myFavRecipes" : "/"}
                  >
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" onClick={() => setNavListshown(false)}>
                    Contacts
                  </Link>
                </li>
                <li>
                  <button onClick={checkLogin} className="btn-log">
                    {isLogin ? "Logout" : "Login"}
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {isOpen && (
        <Modal onClose={closeModal}>
          <FormInput />
        </Modal>
      )}
    </>
  );
}
