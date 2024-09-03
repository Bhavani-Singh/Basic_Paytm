import React from "react";
import PropTypes from "prop-types"

const UserName = React.memo(({firstName}) => {
    return (
        <p className="text-2xl">{firstName}</p>
    )
});

UserName.displayName = "UserName";

UserName.propTypes = {
    firstName: PropTypes.string.isRequired
}

export default UserName;