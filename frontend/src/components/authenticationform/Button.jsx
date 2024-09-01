import React from "react";
import { PropTypes } from "prop-types";

const Button = React.memo(({content, callBack}) => {
    return (
        <button className="text-center py-3 bg-black text-white font-medium hover:bg-gray-700 rounded-lg md:w-3/6 w-5/6" onClick={callBack}>
            {content}
        </button>
    )
});

Button.displayName = "Button";

Button.propTypes = {
    content: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired
}

export default Button;