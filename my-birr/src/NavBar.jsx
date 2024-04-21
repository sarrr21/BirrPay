import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
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
      </div>
    </nav>
  );
};

export default Navbar;
