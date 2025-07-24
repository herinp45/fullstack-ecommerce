import { useState } from "react";
import axios from "../api/axios";
import Alert from "../components/Alert";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [fieldErrors, setFieldErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");

    // navigate
    const navigate = useNavigate();


    async function register(event) {
        event.preventDefault();
        setFieldErrors({});
        setAlertMessage("");

        try {
            await axios.post("/api/v1/auth/register", {
                username,
                email,
                password,
            });

            setAlertMessage("Registration successful!");
            setAlertType("success");


            // Redirect to products page
            setTimeout(() => {
                navigate("/products");
            }, 1000);


        }
        catch (err) {
            if (err.response?.data?.error) {
                // Handle specific error messages from the server
                const errorObj = err.response.data.error;

                // If the error is a string, wrap it in an array; otherwise, use Object.values
                const msgs = typeof errorObj === "string" ? [errorObj] : Object.values(errorObj);

                setAlertMessage(msgs);
                setAlertType("error");
            }
            else if (err.response?.data) {
                setFieldErrors(err.response.data);
            }
            else {
                setAlertMessage("Something went wrong!");
                setAlertType("error");
            }
        }
    }

    const inputClass =
        "w-full h-11 px-3 rounded-md ring-1 ring-black ring-opacity-20 dark:bg-gray-800 " +
        "dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:ring-white " +
        "dark:ring-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition";

    const buttonClass =
        "px-6 py-2 text-white font-semibold text-base tracking-wide " +
        "transition-all duration-300 transform rounded-lg bg-blue-600 " +
        "hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50";

    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen bg-gray-100 dark:bg-gray-900">

            {/* Alert messages */}
            {alertMessage &&
                <Alert type={alertType} message={alertMessage} onClose={() => setAlertMessage("")} />}

            {/* Registration Card */}
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800 shadow-md">
                <div className="px-6 py-4">
                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                        <span className="text-blue-600 dark:text-blue-500">Welcome </span>
                        New User
                    </h3>
                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                        Login or Create Account
                    </p>

                    <form onSubmit={register}>

                    {/* Username */}
                        <div className="mt-4 mb-5 w-full">
                            {fieldErrors.username && (
                            <div className="mb-2 font-medium text-sm text-red-600 dark:text-red-400">
                                {fieldErrors.username}
                            </div>
                            )}
                            <input
                                className={inputClass}
                                type="text"
                                placeholder="Username"
                                aria-label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className="mt-4 mb-5 w-full">
                            {fieldErrors.email && (
                                <div className="mb-2 font-medium text-sm text-red-600 dark:text-red-400">
                                    {fieldErrors.email}
                                </div>
                            )}
                            <input
                                className={inputClass}
                                type="email"
                                placeholder="Email"
                                aria-label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        {fieldErrors.password && (
                            <div className="mb-2 font-medium text-sm text-red-600 dark:text-red-400">
                                {fieldErrors.password}
                            </div>
                        )}
                        <div className="mb-5 w-full relative">

                            <input
                                className={inputClass}
                                type={showPassword ? "text" : "password"}
                                placeholder="Set Password"
                                aria-label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Submit */}
                        <div className="mt-7 mb-5 w-full flex justify-end">
                            <button className={buttonClass}>Sign Up</button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 w-full text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm px-3 text-gray-600 dark:text-gray-200">
                        Already have an account?
                    </span>
                    <Link to={"/login"} className="text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
