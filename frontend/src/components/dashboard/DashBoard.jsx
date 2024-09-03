import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useAuth } from "../../hooks/useAuth"
import axios from "axios"
import LogoutButton from "./LogoutButton";
import SearchBox from "./SearchBox";
import Avatar from "./Avatar";
import UserName from "./UserName";
import SendMoneyButton from "./SendMoneyButton";
import { useNavigate } from "react-router-dom";

function DashBoard() {
    const { user } = useAuth();
    const [userData, setUserData] = useState("");
    const [userBalance, setUserBalance] = useState("");
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            const response = await axios.get("http://localhost:4001/api/v1/user/populate", {
                                headers: {
                                    "Content-Type": "application/json",
                                    "authorization": user
                                }
                            });

            setUserData(response.data.firstname);
            setUserBalance(response.data.balance);
        }

        fetchUserData();
    });

    useEffect(() => {
        async function fetchSearchedUser() {
            const response = await axios.get(`http://localhost:4001/api/v1/user/bulk?filter=${search}`, {
                headers: {
                    "authorization": user
                }
            });

            setUsers(response.data.user);
        }

        fetchSearchedUser();
    })

    function handleOnChange(e) {
        setSearch(e.target.value);
    }

    return (
        <div className="w-[100dvw] h-[100dvh] flex flex-col bg-gray-200">
            <NavBar heading="Paytm Karo" username={userData}/>

            <main className="flex flex-col p-10 gap-7">

                <div className="flex justify-between">
                    <div className="flex gap-4 text-2xl font-bold">
                        <p>Balance:</p>
                        <div className="flex gap-1">
                            <p>₹</p>
                            <p>{userBalance}/-</p>
                        </div>
                    </div>

                    <LogoutButton />
                    
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl font-bold">Users:</h1>
                    <SearchBox value={search} callBack={handleOnChange} />
                </div>
                
                <div className="flex flex-col gap-4">
                    {users.map((user) => {
                        return (
                            <div key={user._id} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Avatar firstLetter={user.firstname[0]} />
                                    <UserName firstName={user.firstname} />
                                </div>
                                
                                <SendMoneyButton callBack={() => { navigate("/send", {state:{receiverId: user._id, firstName: user.firstname}})}} />
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}

export default DashBoard;