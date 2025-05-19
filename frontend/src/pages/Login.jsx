import { useState } from "react";

function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    return (
        <div className="flex items-center justify-center min-w-screen min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="px-6 py-4">

                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                        Welcome Back
                    </h3>
                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or Create Account</p>
                    <form>
                        <div className="mt-4 mb-5 w-full">
                            <input
                                className="block w-full h-10 px-2
                                 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 text-gray-200
                                  dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="email" placeholder="Email Address" aria-label="Email Address"/>
                        </div>
                    </form>
                </div>
            </div>
            </div>

            );
            }

            export default Login;