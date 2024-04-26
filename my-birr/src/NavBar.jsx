import { Link, Navigate, useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("userEmailBirrPay");
    navigate("/login");
  };

  return (
    <nav className=" flex items-center justify-between flex-wrap  p-6">
      {/* <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-3xl tracking-tight">BirrPay</span>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      <div className="hidden lg:block">
        <Link
          to="/login"
          className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
          onClick={onLogout}
        >
          Logout
        </Link>
      </div> */}
      <div className="navbar bg-[#1d232a]">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn text-white btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">
                  <a>Homepage</a>
                </Link>
              </li>
              <li>
                <Link to={"/orders"}>
                  <a>Orders</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-white text-xl">BirrPay</a>
        </div>
        <div className="navbar-end">
          <div className="block mx-2 ">
            <button
              className="w-20 flex items-center px-16 py-2 border rounded text-blue-200 btn btn-outline p-2 mt-4 btn-accent hover:text-white hover:border-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
