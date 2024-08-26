import PropTypes from "prop-types"

function Heading({content}) {
    return (
        <h1 className="text-4xl font-bold">
            {content}
        </h1>
    )
}

Heading.propTypes = {
    content: PropTypes.string.isRequired
}

export default Heading;