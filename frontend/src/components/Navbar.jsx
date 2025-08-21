import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import CartPopup from "./Cart/CartPopup";

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [isCartOpen, setIsCartOpen] = useState(false);


    useEffect(() => {
        const darkMode = localStorage.getItem("theme");
        if (darkMode === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }


    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
        else {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    };



    const cartSvg = (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17a2 2 0 100 4 2 2 0 000-4zM9 19a2 2 0 11-4 0 2 2 0 014 0z"
            />
        </svg>
    );

    const darkModeSvg = (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
    );

    const lightModeSvg = (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36l-1.41 1.41M7.05 16.95l-1.41 1.41M16.95 16.95l1.41 1.41M6.63 6.63L5.22 5.22M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
        </svg>
    );

    const hamburgerSvg = (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );

    const closeSvg = (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md w-full">
            {isCartOpen && (<CartPopup onClose={() => setIsCartOpen(false)} closeSvg={closeSvg}/>)}
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
                {/* Logo */}
                <Link to="/" className="text-3xl font-bold text-black dark:text-white">
                    H<span className="text-blue-600">tag</span>
                </Link>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    {/* Search */}
                    <div className="mt-1 md:mt-0">
                        <SearchBar />
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/products" className="text-gray-800 dark:text-white hover:text-blue-600 hover:dark:text-blue-400">
                            Products
                        </Link>
                        <Link to={"/image-search"} className="text-gray-800 dark:text-white hover:text-blue-600 hover:dark:text-blue-400">
                            Image Search
                        </Link>
                        <button
                            onClick={toggleDarkMode}
                            className="w-6 h-6 text-gray-800 dark:text-white hover:text-blue-600 hover:dark:text-blue-400"
                        >
                            {isDarkMode ? darkModeSvg : lightModeSvg}
                        </button>
                        <button onClick={()=>{setIsCartOpen(true)}} className="w-6 h-6 text-gray-800 dark:text-white hover:text-blue-600 hover:dark:text-blue-400">
                            {cartSvg}
                        </button>
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            className="text-gray-800 dark:text-white hover:text-blue-600 hover:dark:text-blue-400"
                        >
                            {isMobileMenuOpen ? closeSvg : hamburgerSvg}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            {isMobileMenuOpen && (
                <div className="fixed top-0 right-0 h-full w-1/2 bg-white dark:bg-gray-900 shadow-lg p-6 z-40 md:hidden">
                    <div className="flex flex-col space-y-6">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-800 dark:text-white hover:text-blue-600 ml-auto hover:dark:text-blue-400"
                        >
                            {closeSvg}
                        </button>
                        <Link
                            to="/products"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg text-gray-800 dark:text-white hover:text-blue-600 hover:dark:text-blue-400"
                        >
                            Products
                        </Link>
                        <button
                            onClick={() => {
                                toggleDarkMode();
                                setIsMobileMenuOpen(false);
                            }}
                            className="text-lg text-gray-800 dark:text-white flex items-center space-x-2 hover:text-blue-600 hover:dark:text-blue-400"
                        >
                            {isDarkMode ? darkModeSvg : lightModeSvg}
                            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                        </button>
                        <button
                            onClick={() => {
                                setIsCartOpen(true);
                            }}
                            className="text-lg text-gray-800 dark:text-white flex items-center space-x-2 hover:text-blue-600 hover:dark:text-blue-400"
                        >
                            {cartSvg}
                            <span>Cart</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;