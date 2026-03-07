import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/notre-histoire', label: 'Notre Histoire' },
    { path: '/menu', label: 'Menu' },
    { path: '/galerie', label: 'Galerie' },
    { path: '/avis', label: 'Avis' },
    { path: '/contact', label: 'Contact' },
  ];
  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-poppins font-bold text-primary">
              Saveur de la Terre
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-poppins font-semibold transition duration-300 ${
                  isActive(link.path)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/reserver" className="btn-primary">
              Réserver
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 font-poppins ${
                  isActive(link.path)
                    ? 'text-primary font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/reserver"
              onClick={() => setIsOpen(false)}
              className="block mt-2 btn-primary text-center"
            >
              Réserver
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;