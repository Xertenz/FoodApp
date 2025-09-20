import { useState } from "react";
import logo from "../../assets/logo.png";
import Modal from "../modal/Modal.jsx" 
import FormInput from "../formInput/FormInput.jsx";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const checkLogin = () => {
    setIsOpen(true);
  };

	const closeModal = () => {
		setIsOpen(false);
	}

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <img src={logo} alt="Logo here" width={300} />
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/recipes">Recipes</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contacts">Contacts</a>
              </li>
              <li>
                <button onClick={checkLogin}>Login</button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
			{isOpen && <Modal onClose={closeModal} ><FormInput /></Modal>}
    </>
  );
}
