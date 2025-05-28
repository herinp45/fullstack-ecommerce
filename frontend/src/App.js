import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import ProductList from "./pages/ProductList";
import Spinner from "./components/Spinner";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Define your routes here */}
                <Route path="/login" element={<Login />} />

                {/* Register route */}
                <Route path="/register" element={<Register />} />

                {/* Product routes */}
                <Route path="/products" element={<PrivateRoute>
                    <ProductList />
                </PrivateRoute>} />

                <Route path="/"  element={<Spinner />} />

                {/* Cart route */}
                <Routes path="/cart" element={<PrivateRoute>
                    <Cart />
                </PrivateRoute>} />

            </Routes>
        </BrowserRouter>
    );
}
export default App;


