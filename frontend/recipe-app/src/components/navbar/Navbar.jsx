import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
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
          </ul>
        </div>
      </nav>
    </header>
  );
}
