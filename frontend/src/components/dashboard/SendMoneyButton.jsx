import React from "react"

const SendMoneyButton = React.memo(({callBack}) => {
    return (
        <button className="w-[130px] h-[45px] text-white font-bold bg-black hover:bg-gray-700 rounded-md" onClick={callBack}>
            Send Money
        </button>
    )
});

SendMoneyButton.displayName = "SendMoneyButton";

export default SendMoneyButton;