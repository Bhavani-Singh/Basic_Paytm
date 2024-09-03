import React from "react"
import PropTypes from "prop-types"

const Avatar = React.memo(({firstLetter}) => {
    return (
        <div className="rounded-full bg-lime-500 text-3xl text-white p-2 w-14 h-14 flex justify-center items-center">
            {firstLetter}
        </div>
    )
});

Avatar.displayName = "Avatar";

Avatar.propTypes = {
    firstLetter: PropTypes.string.isRequired
}

export default Avatar;