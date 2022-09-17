import { Link } from "@remix-run/react";
import { motion, useReducedMotion } from "framer-motion";

import icon from "~/../public/favicon.png";

export const HomeNav = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.nav
      className="nav"
      initial={{ y: shouldReduceMotion ? -50 : -200 }}
      animate={{ y: 0 }}
    >
      <Link prefetch="intent" to="/" rel="icon">
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
    </motion.nav>
  );
};
