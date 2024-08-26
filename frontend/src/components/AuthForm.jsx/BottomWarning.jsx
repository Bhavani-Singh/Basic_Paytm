import PropTypes from "prop-types";

function BottomWarning({content}) {
    return (
        <p className="text-center">
            {content}
        </p>
    )
}

BottomWarning.propTypes = {
    content: PropTypes.string.isRequired
}

export default BottomWarning;