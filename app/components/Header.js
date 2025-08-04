"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();
  const [role, setRole] = useState("");
  const [initial, setInitial] = useState("");

  // Current Path
  const isArticlePage = pathname === "/article";

  // Set User Proile
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
      setInitial(storedRole.charAt(0));
    }
  }, []);

  // Handle Scrool Header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Click Outside to Close Menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    setShowDialog(false);
    setMenuOpen(false);

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logout successful");

    window.location.href = "/auth/login";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled || !isArticlePage ? "bg-white shadow" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Image
          src={
            scrolled || !isArticlePage ? "/logo-color.svg" : "/logo-white.svg"
          }
          alt="Logo"
          width={120}
          height={40}
          className="transition-all duration-300"
        />

        {/* Account Menu */}
        <div className="relative inline-block text-left" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 focus:outline-none cursor-pointer"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-300 text-blue-900 font-bold">
              {initial}
            </div>
            <span
              className={`hidden md:inline underline ${
                scrolled || !isArticlePage ? "text-black" : "text-white"
              }`}
            >
              {role}
            </span>
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/10 z-50">
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  disabled
                >
                  My Account
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowDialog(true)}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            </div>
          )}

          {/* Dialog Loogout */}
          {showDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-3">
              <div className="bg-white rounded-md shadow-md p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-2">Logout</h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to logout?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setShowDialog(false), setMenuOpen(false);
                    }}
                    className="px-4 py-2 text-black border border-gray-200 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
