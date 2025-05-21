import { useState } from "react";

function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const inputClass = "w-full h-11 px-3 rounded-md ring-1 ring-black ring-opacity-20 " +
        "dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 " +
        "dark:ring-white dark:ring-opacity-30 focus:outline-none focus:ring-2 " +
        "focus:ring-blue-400 focus:ring-opacity-50 transition";

    const buttonClass = "px-6 py-2 text-white font-semibold text-base tracking-wide " +
        "transition-colors duration-300 transform bg-blue-600 rounded-lg " +
        "hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50";


    return (
        <div className="flex items-center justify-center min-w-screen min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800 shadow-md">
                <div className="px-6 py-4">

                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                        Welcome Back
                    </h3>
                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or Create Account</p>
                    <form>
                        <div className="mt-4 mb-5 w-full">
                            <input
                                className={inputClass}
                                type="text" placeholder="Email or Username" aria-label="Email or Username"/>
                        </div>
                        <div className="mb-5 w-full">
                            <input
                                className={inputClass}
                                type="password" placeholder="Password" aria-label="Password"/>
                        </div>
                        <div className="mt-7 mb-5 w-full flex justify-end">
                            <button className={buttonClass} >Sign In</button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center py-4  w-full text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm px-3 text-gray-600 dark:text-gray-200">Don't have an account?</span>
                    <a href="#" className="text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a>
                </div>
            </div>
        </div>

    );
}

export default Login;