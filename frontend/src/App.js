import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import ProductList from "./pages/ProductList";
import Spinner from "./components/Spinner";
import Cart from "./pages/Cart";
import ProductDetailPage from "./pages/ProductDetailPage";

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

                <Route path="/product/:id" element={<PrivateRoute>
                    <ProductDetailPage />
                </PrivateRoute>} />

                <Route path="/"  element={<Spinner />} />

                {/* Cart route */}
                <Route path="/cart" element={<PrivateRoute>
                    <Cart />
                </PrivateRoute>} />

            </Routes>
        </BrowserRouter>
    );
}
export default App;


