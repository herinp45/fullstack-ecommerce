import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import ProductList from "./pages/ProductList";
import Spinner from "./components/Spinner";
import Cart from "./pages/Cart";
import ProductDetailPage from "./pages/ProductDetailPage";
import Layout from "./components/Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Define your routes here */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Spinner />} />

                {/* Product routes */}
                <Route element={<Layout />}>
                    <Route path="/products" element={<PrivateRoute>
                        <ProductList />
                    </PrivateRoute>} />

                    <Route path="/product/:id" element={<PrivateRoute>
                        <ProductDetailPage />
                    </PrivateRoute>} />

                    {/* Cart route */}
                    <Route path="/cart" element={<PrivateRoute>
                        <Cart />
                    </PrivateRoute>} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}
export default App;


