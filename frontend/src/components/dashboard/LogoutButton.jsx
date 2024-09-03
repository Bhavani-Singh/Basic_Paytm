import React from "react"
import { useAuth } from "../../hooks/useAuth";


const LogoutButton = React.memo(() => {
    const { logout } = useAuth();

    function handleOnClick() {
        logout();
    }

    return (
        <button className="w-[100px] h-[50px] text-white font-bold rounded-md bg-red-500 hover:bg-red-800" onClick={handleOnClick}>Logout</button>
    )
});

LogoutButton.displayName = "LogoutButton";

export default LogoutButton;