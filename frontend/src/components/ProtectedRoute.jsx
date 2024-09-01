import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

const ProtectedRoute = ({children}) => {
    const { user } = useAuth();

    if(!user) {
        return <Navigate to="/signin" />;
    }
    
    return children;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    children: PropTypes.element
}


