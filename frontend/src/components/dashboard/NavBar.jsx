import PropTypes from "prop-types"
import Avatar from "./Avatar";
import UserName from "./UserName";


function NavBar({heading, username}) {
    return (
        <div className="width-[100dvh] h-auto bg-white shadow-md flex justify-between p-5 items-center">
            <h1 className="text-3xl font-bold">
                {heading}
            </h1>
            <div className="flex gap-3 items-center">
                <UserName firstName={`Hello, ${username}`} />
                <Avatar firstLetter={username[0]} />
            </div>
        </div>
    )
}

NavBar.propTypes = {
    heading: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}

export default NavBar;