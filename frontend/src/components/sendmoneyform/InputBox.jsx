import React from "react"
import PropTypes from "prop-types"

const InputBox = React.memo(({value, callBack}) => {
    return (
        <input type="number" placeholder="Enter amount" value={value} onChange={callBack} className="outline-none border border-gray-300 w-full p-3 rounded-md"/>
    )
});

InputBox.displayName = "InputBox";

InputBox.propTypes = {
    value: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired
}

export default InputBox;