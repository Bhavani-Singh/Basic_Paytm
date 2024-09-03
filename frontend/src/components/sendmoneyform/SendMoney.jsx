import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth"
import Avatar from "./Avatar";
import UserName from "./UserName";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import InputBox from "./InputBox";
import Button from "./Button";

const SendMoney = React.memo(() => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const receiverId = location.state.receiverId;
    const firstName = location.state.firstName;
    
    const [amount, setAmount] = useState("");

    function handleOnChange(e) {
        setAmount(e.target.value);
    }

    async function handleOnClick() {
        const response = await axios.post("http://localhost:4001/api/v1/account/transfer", {
                            to: receiverId,
                            amount
                        }, 
                        {
                            headers: {
                                "authorization": user
                            }
                        }
                        );

        if(response.statusText === "OK") {
            navigate("/dashboard");
        }
    }

    return (
        <div className="w-[100dvw] h-[100dvh] overflow-y-auto flex justify-center items-center bg-gray-200">
            <div className="w-[530px] h-auto bg-white shadow-md flex flex-col gap-10 rounded-md px-3 py-10">
                
                <Heading content="Send Money" />

                <div className="flex flex-col gap-4 px-7 pb-2">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-3 items-center">
                            <Avatar firstLetter={firstName[0]} />
                            <UserName firstName={firstName} />
                        </div>

                        <SubHeading content="Amount (in Rs)" />  
                    </div>

                    <div>
                        <InputBox value={amount} callBack={handleOnChange} />
                    </div>

                    <div>
                        <Button content="Initiate Transfer" callBack={handleOnClick}/>
                    </div>
                </div>
            </div>
        </div>
    )
});

SendMoney.displayName = "SendMoney";

export default SendMoney;