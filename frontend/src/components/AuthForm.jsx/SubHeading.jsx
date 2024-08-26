import PropTypes from "prop-types";

function SubHeading({content}) {
    return (
        <p className="text-xl text-center text-gray-500 w-5/6">
            {content}
        </p>
    )
}

SubHeading.propTypes = {
    content: PropTypes.string.isRequired
}

export default SubHeading;