import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import stylesUrl from "~/styles/root.css";
import base from "~/../node_modules/sanitize.css/sanitize.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesUrl }, {rel : "stylesheet", href : base}]
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
      <html lang="en">
          <head>
              <Meta />
              <Links />
              <link
                  rel="shortcut icon"
                  href="favicon.png"
                  type="image/x-icon"
              />
          </head>
          <body>
              <main className="main">
                  <Outlet />
                  <ScrollRestoration />
                  <Scripts />
                  <LiveReload />
              </main>
          </body>
      </html>
  );
}
