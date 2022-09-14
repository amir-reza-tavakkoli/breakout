import { Food } from "@prisma/client";

import stylesUrl from "~/styles/index.css";
import { db } from "~/utils/db.server";
import { LinksFunction } from "@remix-run/react/dist/routeModules";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
    return <article className="index">
        <h1>Welcom to Breakout</h1>
    </article>;
}
