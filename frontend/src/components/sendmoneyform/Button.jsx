import React from "react"
import PropTypes from "prop-types"

const Button = React.memo(({content, callBack}) => {
    return (
        <button className="w-full py-3 bg-green-500 text-white text-lg font-medium rounded-md hover:bg-green-400" onClick={callBack}>{content}</button>
    )
});

Button.displayName = "Button";

Button.propTypes = {
    content: PropTypes.string.isRequired,
    callBack: PropTypes.string.isRequired
}

export default Button;