import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";
import { MdOutlinePeople } from "react-icons/md";
import { TbApps } from "react-icons/tb";
import { CiBellOn } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { PiScroll } from "react-icons/pi";
import { CiGift } from "react-icons/ci";
import { RiBug2Line } from "react-icons/ri";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";

import Logo from "../../Assets/image.png";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const location = useLocation();

  const getSelectedIndex = () => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/analytics":
        return 1;
      case "/revenue":
        return 2;
      case "/crm":
        return 3;
      case "/apps":
        return 4;
      default:
        return 0;
    }
  };

  const selected = getSelectedIndex();

  async function fetchAndDisplayInitials() {
    try {
      // Fetch the user data from the API
      const response = await axios.get("https://fe-task-api.mainstack.io/user");
      const user = response.data;

      // Extract the first letters
      const firstNameInitial = user.first_name?.charAt(0).toUpperCase() || "";
      const lastNameInitial = user.last_name?.charAt(0).toUpperCase() || "";

      // Combine initials
      const initials = `${firstNameInitial}${lastNameInitial}`;

      // Combine first name and last name to create full name
      const fullName = `${user.first_name || ""} ${
        user.last_name || ""
      }`.trim();
      const email = user.email || "Email not available";

      // Update elements with the full name
      const fullNameElements = document.querySelectorAll(".user-fullname");
      fullNameElements.forEach((element) => {
        element.textContent = fullName;
      });

      // Update elements with the email
      const emailElements = document.querySelectorAll(".user-email");
      emailElements.forEach((element) => {
        element.textContent = email;
      });

      // Find all elements with the class "user-initials"
      const initialsElements = document.querySelectorAll(".user-initials");

      // Update each element's textContent
      initialsElements.forEach((element) => {
        element.textContent = initials;
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Call the function
  fetchAndDisplayInitials();

  return (
    <div className="navbar">
      <img src={Logo} alt="Logo" />

      <nav>
        <ul>
          <li className={`navbar-item ${selected === 0 ? "selected" : ""}`}>
            <GoHome className="icon" />
            <a href="/revenue">Home</a>
          </li>
          <li className={`navbar-item ${selected === 1 ? "selected" : ""}`}>
            <MdOutlineAnalytics className="icon" />
            <a href="/revenue">Analytics</a>
          </li>
          <li className={`navbar-item ${selected === 2 ? "selected" : ""}`}>
            <FaMoneyBills className="icon" />
            <a href="/revenue">Revenue</a>
          </li>

          <li className={`navbar-item ${selected === 3 ? "selected" : ""}`}>
            <MdOutlinePeople className="icon" />
            <a href="/revenue">CRM</a>
          </li>

          <li className={`navbar-item ${selected === 4 ? "selected" : ""}`}>
            <TbApps className="icon" />
            <a href="/revenue">Apps</a>
          </li>
        </ul>
      </nav>

      <div class="notification">
        <CiBellOn className="icon" />

        <MdOutlineMessage className="icon" />

        <div onClick={toggleMenu} class="menu">
          <p className="user-initials"></p>
          <RxHamburgerMenu className="icon" />
        </div>
      </div>

      {isOpen && (
        <div class="menu-dropdown">
          <div class="user">
            <p className="user-initials"></p>
            <div class="usernames">
              <p className="user-fullname"></p>
              <p className="user-email"></p>
            </div>
          </div>
          <div class="menu-icons">
            <Link to="/revenue">
              <div class="menu-icons-text">
                <CiSettings className="icon" />
                <p>Settings</p>
              </div>
            </Link>
            <Link to="/revenue">
              <div class="menu-icons-text">
                <PiScroll className="icon" />
                <p>Purchase History</p>
              </div>
            </Link>
            <Link to="/revenue">
              <div class="menu-icons-text">
                <CiGift className="icon" />
                <p>Refer and Earn</p>
              </div>
            </Link>
            <Link to="/revenue">
              <div class="menu-icons-text">
                <TbApps className="icon" />
                <p>Integrations</p>
              </div>
            </Link>
            <Link to="/revenue">
              <div class="menu-icons-text">
                <RiBug2Line className="icon" />
                <p>Report a Bug</p>
              </div>
            </Link>
            <Link to="/revenue">
              <div class="menu-icons-text">
                <MdOutlineSwitchAccount className="icon" />
                <p>Switch Account</p>
              </div>
            </Link>
            <Link to="/revenue">
              <div class="menu-icons-text">
                <GoSignOut className="icon" />
                <p>Logout</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
