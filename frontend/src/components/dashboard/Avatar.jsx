import React from "react";
import PropTypes from "prop-types"

const Avatar = React.memo(({firstLetter}) => {
    return (
        <div className="rounded-full bg-gray-300 text-2xl p-2 w-10 h-10 flex justify-center items-center">
            {firstLetter}
        </div>
    )
});

Avatar.displayName = "Avatar";

Avatar.propTypes = {
    firstLetter: PropTypes.string.isRequired
}

export default Avatar;