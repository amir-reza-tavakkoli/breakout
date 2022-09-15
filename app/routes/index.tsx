
import stylesUrl from "~/styles/index.css";
import { db } from "~/utils/db.server";
import { LinksFunction } from "@remix-run/react/dist/routeModules";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
    return (
        <div className="index">
            <h1>Welcom to Breakout</h1>
            <dl className="about">
                <dt>About</dt>
                <dd>
                    Breakout is a dataset of foods and categories of foods that
                    can contribute to vulgaris acne. The information provided
                    here are supported by scientific articles but, they are not
                    meant to be basis for medical descisions.
                </dd>
                <dt>Autor</dt>
                <dd>
                    The application is designed and
                    implemented(Front-end/Backend/Database)
                    <a
                        href="https://github.com/amir-reza-tavakkoli"
                        rel="external"
                    >
                        Amir Reza Tavakoli
                    </a>
                    .
                </dd>
            </dl>
        </div>
    );
}