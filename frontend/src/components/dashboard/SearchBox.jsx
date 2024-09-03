import React from "react"
import PropTypes from "prop-types"

const SearchBox = React.memo(({value, callBack}) => {
    
    return (
        <input type="text" placeholder="Search users..." value={value} onChange={callBack} className="w-full outline-none border border-gray-400 pl-4 py-2 rounded-md"/>
    )
});

SearchBox.displayName = "SearchBox";

SearchBox.propTypes = {
    value: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired
}

export default SearchBox;