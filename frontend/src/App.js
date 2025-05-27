import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<PrivateRoute>
                    <ProductList />
                </PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;


