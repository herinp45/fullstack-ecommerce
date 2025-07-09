import { Link } from "react-router-dom";

function CheckOutResultPage({ success }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
            <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white text-3xl font-bold ${
                    success ? "bg-blue-600" : "bg-red-600"
                }`}
            >
                {success ? "✓" : "✗"}
            </div>

            <h1
                className={`text-3xl font-bold mb-2 ${
                    success ? "text-blue-700" : "text-red-700"
                }`}
            >
                Checkout {success ? "Successful!" : "Failed!"}
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {success
                    ? "Thank you for your purchase. Your order will be processed shortly."
                    : "Something went wrong. Please try again."}
            </p>

            <Link
                to={success ? "/products" : "/checkout"}
                className={`inline-block px-6 py-2 rounded font-semibold transition ${
                    success
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                }`}
            >
                {success ? "Return to Products" : "Return to Checkout"}
            </Link>
        </div>
    );
}

export default CheckOutResultPage;
