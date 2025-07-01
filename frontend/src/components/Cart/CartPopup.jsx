import CartItemCard from "./CartItemCard";
import {useCart} from "../../context/CartContext";
import {useNavigate} from "react-router-dom";

function CartPopup({ onClose }) {
    const { cartItems, subTotal } = useCart();

    const navigate = useNavigate();

    return (
        <div className="fixed top-0 right-0 h-screen w-full md:w-1/2 z-50 bg-gray-100 dark:bg-gray-900 shadow-lg overflow-y-auto p-6">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 mt-2">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cartItems.map((item) => (
                        <CartItemCard item={item} key={item.id} />
                    ))}
                </ul>
            )}
            <div className="mt-8 text-xl flex justify-between text-gray-800 border-t p-4 dark:text-white font-semibold">
                <span>Total</span>
                <span>
                        ${subTotal}
                    </span>
            </div>

            <button className="mt-6 w-full font-semibold border-2 border-blue-600 text-blue-500 hover:text-white py-2 rounded
            hover:bg-blue-600 transition-colors"
                    onClick={() => {
                        navigate("/cart");
                onClose();
            }}>Shopping Bag</button>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => {
                navigate("/checkout");
                onClose();
            }}>Checkout</button>
        </div>
    );
}

export default CartPopup;
