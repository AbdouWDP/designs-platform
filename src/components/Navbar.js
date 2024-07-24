import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="navbar w-screen h-16 shadow-md bg-white">
      <nav className="w-11/12 h-full flex justify-between items-center m-auto">
        <Link to="/">
          <p className="text-3xl font-bold">Designs</p>
        </Link>
        {user ? (
          <Link to="/admin">
            <div className="account-image w-12 h-12">
              <img
                src="https://assets.manutd.com/AssetPicker/images/0/0/10/126/687707/Legends-Profile_Cristiano-Ronaldo1523460877263.jpg"
                alt=""
                className="w-full h-full cursor-pointer object-cover rounded-full"
              ></img>
            </div>
          </Link>
        ) : (
          <Link to="/auth">
            <div className="login-button">
              <button className="navbar-login-button w-28 h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-sm">
                Login
              </button>
            </div>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
