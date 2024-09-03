import React from "react"
import PropTypes from "prop-types"

const UserName = React.memo(({firstName}) => {
    return (
        <div>
            <p className="text-3xl font-bold">{firstName}</p>
        </div>
    )
});

UserName.displayName = "UserName";

UserName.propTypes = {
    firstName: PropTypes.string.isRequired
}

export default UserName;