import React from "react";
import { useCart } from "../context/CartContext";

function CheckOut() {
    const { cartItems, subTotal } = useCart();
    const country = ["Canada", "USA", "UK"];

    return (
        <div className="flex flex-col md:flex-row items-start min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6 gap-6
         w-full overflow-x-hidden">
            {/* Billing Detail */}
            <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex-1 h-full">
                <form className="space-y-6 pb-6 text-gray-800 dark:text-gray-300">
                    <h1 className="text-2xl font-bold mb-4">Billing Details</h1>

                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            className="w-full px-3 py-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-transparent focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="john@example.com"
                            className="w-full px-3 py-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-transparent focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block mb-1 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="+1 234 567 8901"
                            className="w-full px-3 py-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-transparent focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="country" className="block mb-1 font-medium">Country</label>
                        <select
                            id="country"
                            className="w-full px-3 py-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-transparent text-gray-800 dark:text-white focus:outline-none focus:border-blue-500"
                        >
                            <option className="bg-white dark:bg-gray-800" value="">Select Country</option>
                            {country.map((c, index) => (
                                <option key={index} className="bg-white dark:bg-gray-800" value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="address" className="block mb-1 font-medium">Address</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="123 Main St"
                            className="w-full px-3 py-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-transparent focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="city" className="block mb-1 font-medium">City</label>
                            <input
                                type="text"
                                id="city"
                                placeholder="New York"
                                className="w-full px-3 py-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-transparent focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="postal" className="block mb-1 font-medium">Postal Code</label>
                            <input
                                type="text"
                                id="postal"
                                placeholder="10001"
                                className="w-full px-3 py-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-transparent focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold">
                        Place Order
                    </button>
                </form>
            </div>

            {/* Order Summary */}
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex-1 h-full">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Order Summary</h2>
                {cartItems.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>{item.product.name} (x{item.quantity})</span>
                                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 border-t pt-4">
                            <div className="flex justify-between text-gray-800 dark:text-white font-semibold">
                                <span>Total</span>
                                <span>${subTotal}</span>
                            </div>
                        </div>

                    </>
                )}
            </div>
        </div>
    );
}

export default CheckOut;
