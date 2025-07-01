import Spinner from "../components/Spinner";
import CartItemCard from "../components/CartItemCard";
import {useCart} from "../context/CartContext";

function Cart() {
    const {cartItems, loading}  = useCart();
    console.log("Current cart items:", cartItems);
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col items-center min-h-screen px-4 py-8 dark:bg-gray-900 bg-gray-100">
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                        Your Cart
                    </h1>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Your cart is empty.</p>
                    ) : (
                        <>
                            <ul className="space-y-4 w-full max-w-2xl">
                                {cartItems.map((item) => (
                                    <CartItemCard key={item.id} item={item} />
                                ))}
                            </ul>

                            <div className="mt-6 w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Order Summary</h2>
                                <ul className="space-y-2">
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
                                        <span>
                                        ${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );


}

export default Cart;
