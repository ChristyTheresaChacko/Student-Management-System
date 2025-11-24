import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/LOGO.png";

const SidebarMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-6 py-3 rounded-md transition-colors duration-200 ${
      isActive
        ? "bg-green-200 text-green-900 font-semibold"
        : "hover:bg-green-700 hover:text-white text-white"
    }`;

  return (
    <>
      {/* Hamburger Button (visible on mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-green-900 text-white hover:bg-green-800"
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-72 h-full bg-green-900 text-white flex flex-col p-6 z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="Greenfield Logo" className="w-12 h-14 mt-4" />
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold tracking-wide uppercase">GREENFIELD</span>
            <span className="text-lg font-light">StudentConnect</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={linkClass}
              end={item.exact}
              onClick={() => setIsOpen(false)} // Close sidebar on link click
            >
              <span className="text-lg">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SidebarMenu;
