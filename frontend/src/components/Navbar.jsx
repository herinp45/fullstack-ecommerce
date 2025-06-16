import { Link } from "react-router-dom";
import {useEffect, useState} from "react";

function Navbar() {

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(false);

    // Set initial dark mode state based on localStorage
    useEffect(() => {
        const darkMode = localStorage.getItem('theme')
        if (darkMode === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(prevState => !prevState);
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.remove('dark');
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
        else {
            root.classList.add('dark');
            root.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    }

    // SVG icons for cart and search
    const cartSvg = (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
    );
    const searchSvg = (
        <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
        </svg>
    );

    return (
        <nav className="relative bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-4">
                <Link to="/" className="py-2 px-6">
                    <span className="text-black dark:text-white font-bold text-3xl">
                        H<span className="text-blue-600">tag</span>
                    </span>
                </Link>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2"
                        >
                            {searchSvg}
                        </button>
                        {isSearchOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800
                                    border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2
                                    focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/products"
                            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2"
                        >
                            Products
                        </Link>


                        <button
                            className="px-2 py-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                            onClick={toggleDarkMode}>
                            {isDarkMode ? "🌙" : "☀️"}
                        </button>

                        <Link
                            to="/cart"
                            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2"
                        >
                            {cartSvg}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
);
}

export default Navbar;
