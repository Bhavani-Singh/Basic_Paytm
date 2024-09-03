import React from "react"
import PropTypes from "prop-types"

const SubHeading = React.memo(({content}) => {
    return (
        <div>
            <p className="font-medium">{content}</p>
        </div>
    )
});

SubHeading.displayName = "SubHeading";

SubHeading.propTypes = {
    content: PropTypes.string.isRequired
}

export default SubHeading;