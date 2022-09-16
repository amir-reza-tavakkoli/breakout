import {
    MetaFunction,
    LinksFunction,
    redirect,
    ActionFunction,
} from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useActionData,
} from "@remix-run/react";
import { motion, useReducedMotion } from "framer-motion";

import { HomeNav } from "./components/home-nav";
import { SearchBar } from "./components/search-bar";

import rootStyles from "~/../node_modules/sanitize.css/sanitize.css";
import styles from "~/styles/root.css";
import homeNavStyles from "~/styles/home-nav.css";
import searchBarStyles from "~/styles/search-bar.css";
import icon from "~/../public/favicon.png";

export const LOCALSTORGAE_PREFIX = "liked-item-";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: styles },
        { rel: "stylesheet", href: rootStyles },
        { rel: "stylesheet", href: homeNavStyles },
        { rel: "stylesheet", href: searchBarStyles },
    ];
};

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const name = form.get("search");
    return redirect(`/food/${name}`);
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Breakout",
    description: "What foods can cause you to break out!",
    autor: "Amir Reza Tavakoli",
    viewport: "width=device-width,initial-scale=1",
});

const containerVariant = {
    hidden: {
        x: "100%",
    },
    visible: {
        x: 0,
        transition: {
            type: "spring",
            when: "beforeChildren",
            duration: 1,
        },
    },
};

export default function App() {
    const shouldReduceMotion = useReducedMotion();

    const data = useActionData();
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                <link
                    rel="autor"
                    href="https://github.com/amir-reza-tavakkoli"
                />
                <link rel="icon" href={icon} type="image/x-icon" />
            </head>
            <body>
                <Scripts />
                <main className="main">
                    <HomeNav />
                    <motion.div
                        variants={containerVariant}
                        initial={shouldReduceMotion ? undefined : "hidden"}
                        animate={"visible"}
                        // transition={{ duration: 0.5 }}
                    >
                        <Outlet />
                    </motion.div>
                    <ScrollRestoration />
                    <LiveReload />
                </main>
                <SearchBar />
            </body>
        </html>
    );
}
