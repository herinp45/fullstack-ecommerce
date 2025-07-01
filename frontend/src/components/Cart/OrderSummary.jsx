import {useNavigate} from "react-router-dom";

function OrderSummary({ cartItems, subTotal }) {
    const navigate = useNavigate();
    return (
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
                        ${subTotal}
                    </span>
                </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => navigate("/checkout")}
            >
                Proceed to Checkout
            </button>
        </div>
    );
}

export default OrderSummary;