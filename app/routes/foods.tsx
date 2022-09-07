import { MetaFunction } from "@remix-run/node";
import { Outlet, Link } from "@remix-run/react";

export const meta: MetaFunction = () => ({
    title: "Hi",
});

export default function Foods() {
    return (
        <div>
            <h1>Foods</h1>
            <Outlet/>
        </div>
    );
}
