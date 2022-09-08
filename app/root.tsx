import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import icon from "~/../public/favicon.png";
import stylesUrl from "~/styles/root.css";
import base from "~/../node_modules/sanitize.css/sanitize.css";
import homeNavStyles from "~/styles/home-nav.css";
import searchBarStyles from "~/styles/search-bar.css";

import { HomeNav } from "./components/home-nav";
import { SearchBar } from "./components/search-bar";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: stylesUrl },
        { rel: "stylesheet", href: base },
        { rel: "stylesheet", href: homeNavStyles },
        { rel: "stylesheet", href: searchBarStyles },
    ];
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Breakout",
    viewport: "width=device-width,initial-scale=1",
});

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                <link rel="icon" href={icon} type="image/x-icon" />
            </head>
            <body>
                <main className="main">
                    <HomeNav />
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                    <SearchBar />
                </main>
            </body>
        </html>
    );
}
