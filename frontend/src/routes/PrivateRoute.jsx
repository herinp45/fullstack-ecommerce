import {useAuth} from "../context/AuthContext";
import {Navigate} from "react-router-dom";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children }) => {
    const {isAuthenticated, loading} = useAuth();
    if (loading) {
        return <Spinner />;
    }
    return isAuthenticated ? children : <Navigate to="/login"/>;
}

export default PrivateRoute;