import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from '../../logo.svg'
import { UserContext } from "../../contexts/user.context";
import { signOut } from "../../utils/firebase/firebase.util";

import './navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const handleSignOut = async () => {
        await signOut();
    };
    console.log(currentUser);
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={handleSignOut}>
                            Sign Out
                        </span>
                    ) : (
                        <Link className="nav-link" to="/auth">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
            <Outlet />
        </Fragment>);
}

export default Navigation;