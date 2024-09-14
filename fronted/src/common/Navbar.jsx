import React, { useState, useEffect } from "react";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../data/NavbarLinks";
import { useLocation } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file
import { useSelector } from "react-redux";
import { IoCart } from "react-icons/io5";
import Profiledropdown from "../homepagecomponents/auth/Profiledropdown";
import logo from "../assets/Images/prev.png"
import { MdOutlineArrowCircleDown, MdOutlineArrowCircleUp } from "react-icons/md";

const subLinks = [
  {
    title: "Web-dev",
    link: "/catalog/web-development",
  },
  {
    title:"App-dev",
    link:"/catalog/app-development"

  },
  {
    title: "Python",
    link: "/catalog/python",
  },

];

function Navbar() {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { totalitems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // const [subLinks, setSubLinks] = useState([]);

  // const fetchSubLinks = async () => {
  //   try {
  //     const results = await Apiconnector("GET", categories.CATEGORIES_API);
  //     console.log("Printing the all category", results);
  //     setSubLinks(results.data.data);
  //   } catch (error) {
  //     console.log(error);
  //     console.log("Could not find the category Lists");
  //   }
  // };

  // useEffect(() => {
  //   fetchSubLinks();
  // }, []);

  const matchRoute = (route) => {
    return route ? matchPath({ path: route }, location.pathname) : false;
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navbar-outer">
      <div className="navbar-inner">
        <Link to="/">
          <img src={logo} alt="Logo" className="nav-logo" />
        </Link>

        <nav className="nav-center">
          <ul>
            {NavbarLinks.map((links, index) => (
              <li key={index}>
                {links.title === "Catalog" ? (
                  <div className="flex catalog-container" onClick={toggleDropdown}>
                    <p className={`nav-link ${matchRoute(links?.path) ? "nav-link-active" : ""}`}>
                      {links.title}
                    </p>
                    {dropdownOpen ? (
                      <MdOutlineArrowCircleUp className="dropdown-icon" />
                    ) : (
                      <MdOutlineArrowCircleDown className="dropdown-icon" />
                    )}
                    {dropdownOpen && (
                      <div className="dropdown-menu">
                        {subLinks.map((subLink, subIndex) => (
                          <Link key={subIndex} to={subLink.link} className="dropdown-item">
                            {subLink.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={links?.path}>
                    <p className={matchRoute(links?.path) ? "nav-link-active" : "nav-link"}>
                      {links.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mainloginsignup">
        {token !== null && user && user.accounttype !== "Instructor" && (
          <Link to="/dashboard/cart" className="relative">
            <IoCart />
            {totalitems > 0 && <span>{totalitems}</span>}
          </Link>
        )}
        {token === null ? (
          <>
            <Link to="/login">
              <button className="loginbutton">Login</button>
            </Link>
            <Link to="/signup">
              <button className="signupbutton">SignUp</button>
            </Link>
          </>
        ):(<Profiledropdown />)}
        {/* {token !== null && <Profiledropdown />} */}
      </div>
    </div>
  );
}

export default Navbar;
