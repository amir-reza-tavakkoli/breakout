import { Link } from "@remix-run/react";

import icon from "~/../public/favicon.png";

export const HomeNav = () => {
    return (
        <nav className="nav">
            <Link to="/">
                <span className="nonvisual">Home Page</span>
                <img
                    src={icon}
                    alt=""
                    aria-hidden={true}
                    className="blurry"
                    role="presentation"
                />
                <img src={icon} alt="Logo" width={100} height={100} />
            </Link>
        </nav>
    );
};
