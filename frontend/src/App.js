import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import ProductDetailPage from "./pages/ProductDetailPage";
import Layout from "./components/Product/Layout";
import SearchResults from "./pages/SearchResults";
import CheckOut from "./pages/CheckOut";
import CheckOutResultPage from "./pages/CheckOutResultPage";
import Home from "./pages/Home";
import ImageSearch from "./pages/ImageSearch";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Define your routes here */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<PrivateRoute>
                    <CheckOut />
                </PrivateRoute>
                } />

                {/* Product routes */}
                <Route element={<Layout />}>
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
                    <Route path="/product/:id" element={<PrivateRoute><ProductDetailPage /></PrivateRoute>} />
                    <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                    <Route path="/image-search" element={<PrivateRoute><ImageSearch /></PrivateRoute>} />
                    <Route path="/search" element={<PrivateRoute><SearchResults /></PrivateRoute>} />
                    <Route path="/success" element={<PrivateRoute><CheckOutResultPage success={true} /></PrivateRoute>} />
                    <Route path="/cancel" element={<PrivateRoute><CheckOutResultPage success={false} /></PrivateRoute>} />
                </Route>


            </Routes>
        </BrowserRouter>
    );
}
export default App;


