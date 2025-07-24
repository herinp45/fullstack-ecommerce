import { useState } from "react";
import axios from "../api/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from "../components/Alert";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");

    // navigate
    const navigate = useNavigate();

    // AuthContext
    const { login: saveToken } = useAuth();

    async function login(event) {
        event.preventDefault();
        setAlertMessage("");

        try {

            const response = await axios.post("/api/v1/auth/login", {
                identifier,
                password,
            });

            setAlertType("success");
            setAlertMessage("Login successful!");
            localStorage.setItem("authToken",response.data.token);
            saveToken(response.data.token);

            // Redirect to products page
            setTimeout(() => {
                navigate("/products");
            }, 1000);
        }
        catch (err) {
            if (err.response?.data?.error) {
                const errorObj = err.response.data.error;
                const msgs = typeof errorObj === "string" ? [errorObj] : Object.values(errorObj);
                setAlertMessage(msgs);
                setAlertType("error");
            }
            else {
                setAlertType("error");
                setAlertMessage("Something went wrong!");
            }
        }
    }

    const inputClass =
        "w-full h-11 px-3 rounded-md ring-1 ring-black ring-opacity-20 " +
        "dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 " +
        "dark:ring-white dark:ring-opacity-30 focus:outline-none focus:ring-2 " +
        "focus:ring-blue-400 focus:ring-opacity-50 transition";

    const buttonClass =
        "px-6 py-2 text-white font-semibold text-base tracking-wide " +
        "transition-all duration-300 transform rounded-lg bg-blue-600 " +
        "hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50";

    return (
        <div className="flex items-center justify-center min-w-screen min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Alert messages */}
            {alertMessage && (
                <Alert type={alertType} message={alertMessage} onClose={() => setAlertMessage("")} />
            )}

            {/* Login Card */}
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800 shadow-md">
                <div className="px-6 py-4">
                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                        <span className="text-blue-600 dark:text-blue-500">Welcome </span>
                        Back
                    </h3>
                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                        Login or Create Account
                    </p>
                    <form onSubmit={login}>
                        {/* Identifier */}
                        <div className="mt-4 mb-5 w-full">
                            <input
                                className={inputClass}
                                type="text"
                                placeholder="Email or Username"
                                aria-label="Email or Username"
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-5 w-full relative">
                            <input
                                className={`${inputClass} appearance-none`}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                aria-label="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="mt-7 mb-5 w-full flex justify-end">
                            <button className={buttonClass}>Sign In</button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 w-full text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm px-3 text-gray-600 dark:text-gray-200">
                        Don't have an account?
                    </span>
                    <Link to="/register" className="text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
