import { useCallback, useState } from "react";
import Heading from "../Heading";
import InputBox from "../InputBox";
import SubHeading from "../SubHeading";
import Button from "../Button";
import BottomWarning from "../BottomWarning";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";


function Signin() {
    const { login } = useAuth();
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    const handleOnClick = useCallback(async () => {
        const response = await axios.post("http://localhost:4001/api/v1/user/signin", {
            username: emailId,
            password
        });

        const token = response.data.token;
        setEmailId("");
        setPassword("");

        await login(token);
    }, [emailId, password, login]);

    return (
        <div className="w-[100dvw] h-[100dvh] overflow-y-auto flex justify-center items-center bg-gray-200">
            <div className="sm:w-3/6 h-auto rounded-lg flex flex-col gap-5 py-5 bg-white shadow-md">

                <div className="flex flex-col items-center gap-3 px-8">
                    <Heading content="Sign In"/>
                    <SubHeading content="Enter your credentials to access our account" />
                </div>

                <div className="flex flex-col gap-5 items-center">
                    <InputBox label="Email" inputType="email" placeHolder="johndoe@example.com" inputId="emailId" inputValue={emailId} setValue={setEmailId}/>

                    <InputBox label="Password" inputType="password" inputId="userPassword" inputValue={password} setValue={setPassword}/>

                    <Button content="Sign In" callBack={handleOnClick}/>
                    <BottomWarning content="Don't have an account?" link="Sign Up" route="signup"/>
                </div>

            </div>            
        </div>
    )
}

export default Signin;