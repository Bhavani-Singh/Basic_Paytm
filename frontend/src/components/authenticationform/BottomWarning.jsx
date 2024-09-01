import React from "react";
import PropTypes from "prop-types";

const BottomWarning = React.memo(({content, link, route}) => {
    return (
        <div className="flex justity-center items-center gap-1">
            <p >
                {content}
            </p>
            <a href={`http://localhost:5173/${route}`} className="underline">
                {link}
            </a>
        </div>
    );
});

BottomWarning.displayName = "BottomWarning";

BottomWarning.propTypes = {
    content: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
}

export default BottomWarning;