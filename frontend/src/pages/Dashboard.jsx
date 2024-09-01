import { useAuth } from "../hooks/useAuth";


function Dashboard() {
    const { logout } = useAuth();

    async function handleOnClick() {
        await logout();
    }
    
    return (
        <div>
            <h1 className="text-3xl font-bold underline">This is Dashboard page!</h1>
            <button onClick={handleOnClick}>Logout</button>
        </div>
    )
}

export default Dashboard;