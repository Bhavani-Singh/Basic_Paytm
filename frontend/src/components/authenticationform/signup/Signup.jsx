import Button from "../Button";
import SubHeading from "../SubHeading";
import BottomWarning from "../BottomWarning";
import InputBox from "../InputBox";
import Heading from "../Heading"
import axios from "axios";
import { useState } from "react";
import { useAuth } from "./../../../hooks/useAuth";

function Signup() {
    const { login } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    async function handleOnClick() {

        const response = await axios.post("http://localhost:4001/api/v1/user/signup", {
            username: emailId,
            firstname: firstName,
            lastname: lastName,
            password
        });

        const token = response.data.token;
        setFirstName("");
        setLastName("");
        setEmailId("");
        setPassword("");

        await login(token);
    }

    return (
        
        <div className="w-[100dvw] h-[100dvh] overflow-y-auto flex justify-center items-center bg-gray-200">
            <div className="sm:w-3/6 h-auto rounded-lg flex flex-col gap-5 py-5 bg-white shadow-md">
                <div className="flex flex-col items-center gap-3 px-8">
                    <Heading content="Sign Up"/>
                    <SubHeading content="Enter your information to create an account" />
                </div>

                <div className="flex flex-col gap-5 items-center">
                    <InputBox label="First Name" inputType="text" placeHolder="John" inputId="firstName" inputValue={firstName} setValue={setFirstName}/>

                    <InputBox label="Last Name" inputType="text" placeHolder="Doe" inputId="lastName" inputValue={lastName} setValue={setLastName}/>

                    <InputBox label="Email" inputType="email" placeHolder="johndoe@example.com" inputId="emailId" inputValue={emailId} setValue={setEmailId}/>

                    <InputBox label="Password" inputType="password" inputId="userPassword" inputValue={password} setValue={setPassword}/>

                    <Button content="Sign Up" callBack={handleOnClick}/>
                    <BottomWarning content="Already have an account?" link="Login" route="signin"/>
                </div>
                
            </div>
        </div>
        
    )
}

export default Signup;