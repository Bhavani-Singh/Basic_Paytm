import { PropTypes } from "prop-types";

function Button({content, callBack}) {
    return (
        <button className="text-center py-3 bg-black text-white font-medium hover:bg-gray-700 rounded-lg w-5/6" onClick={callBack}>
            {content}
        </button>
    )
}

Button.propTypes = {
    content: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired
}

export default Button;