import React from "react"
import PropTypes from "prop-types"

const Heading = React.memo(({content}) => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center pt-6">{content}</h1>
        </div>
    )
});

Heading.displayName = "Heading";

Heading.propTypes = {
    content: PropTypes.string.isRequired
}

export default Heading;