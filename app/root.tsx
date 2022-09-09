import {
    MetaFunction,
    LinksFunction,
    redirect,
    ActionFunction,
} from "@remix-run/node";
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useActionData,
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

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const name = form.get("search");
    // const content = form.get("content");
    // we do this type check to be extra sure and to make TypeScript happy
    // we'll explore validation next!
    // if (typeof name !== "string" || typeof content !== "string") {
    //     throw new Error(`Form not submitted correctly.`);
    // }

    // const fields = { name, content };
    console.log(name);

    // const joke = await db.joke.create({ data: fields });
    return redirect(`/food/${name}`);
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Breakout",
    viewport: "width=device-width,initial-scale=1",
});

export default function App() {
    const data = useActionData();
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
                    <LiveReload />
                </main>
                    <SearchBar />
            </body>
            <Scripts />
        </html>
    );
}
