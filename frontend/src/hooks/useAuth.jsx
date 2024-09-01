import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage"
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (data) => {
        setUser(data);
        navigate("/dashboard");
    }

    const logout = async () => {
        setUser(null);
        navigate("/signin");
    }

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}

AuthProvider.propTypes = {
    children: PropTypes.element.isRequired
}