import { Navigate } from "react-router-dom";


// TODO: verify token
export const ProtectedRoute = ({ children }) => {
    const accessToken = localStorage.getItem("__ACCESS_TOKEN");

    if (!accessToken) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};