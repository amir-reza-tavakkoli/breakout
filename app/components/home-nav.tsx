import { Link } from "@remix-run/react";

import icon from "~/../public/favicon.png";

export const HomeNav = () => {
    return (
        <nav className="nav">
            <Link to="/" aria-label="Home Page">
                <img src={icon} alt="" width={120} height={120} />
            </Link>
        </nav>
    );
};
