import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-600 px-10 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          captionGEnie
        </Link>
        
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <ul className={`md:flex md:space-x-6 absolute md:static top-16 left-0 w-screen md:w-auto bg-yellow-600 md:bg-transparent transition-all duration-300 ease-in ${isOpen ? "block" : "hidden"}`}>
          <li>
            <Link to="/" className="block text-white p-3">Home</Link>
          </li>
          <li>
            <Link to="/about" className="block text-white p-3">About</Link>
          </li>
          <li>
            <Link to="/services" className="block text-white p-3">Services</Link>
          </li>
          <li>
            <Link to="/login" className="block text-white p-3">LOGIN</Link>
          </li>
          <li>
            <Link to="/signin" className="block text-white p-3">SIGNIN</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
