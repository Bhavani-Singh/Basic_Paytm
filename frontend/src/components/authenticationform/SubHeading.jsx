import PropTypes from "prop-types";
import React from "react";

const SubHeading = React.memo(({content}) => {
    return (
        <p className="text-xl text-center text-gray-500 w-5/6">
            {content}
        </p>
    )
});

SubHeading.displayName = "SubHeading";

SubHeading.propTypes = {
    content: PropTypes.string.isRequired
}

export default SubHeading;