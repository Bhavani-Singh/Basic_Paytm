import PropTypes from "prop-types"
import React from "react";

const Heading = React.memo(({content}) => {
    return (
        <h1 className="text-4xl font-bold">
            {content}
        </h1>
    )
});

Heading.displayName = "Heading";

Heading.propTypes = {
    content: PropTypes.string.isRequired
}

export default Heading;