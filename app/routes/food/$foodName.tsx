import { json, MetaFunction } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Food, Hierarchy, Status } from "@prisma/client";

import { Card } from "~/components/card";

import { db } from "~/utils/db.server";
import { LinksFunction } from "@remix-run/react/dist/routeModules";
import stylesUrl from "~/styles/card.css";
import { ComponentProps } from "react";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = async ({ params }) => {
    if (!params || !params.foodName) {
        throw new Response("Not found.", {
            status: 404,
        });
    }
    const food: Food | null = await db.food.findUnique({
        where: {
            name: params.foodName[0].toUpperCase() + params.foodName.slice(1),
        },
    });

    if (!food) {
        throw new Response("Not found.", {
            status: 404,
        });
    }

    const status: Pick<Status, "overall" | "advice"> | null =
        await db.status.findUnique({
            where: { id: food.statusId },
            select: { overall: true, advice: true },
        });

    const categories: Hierarchy[] = await db.hierarchy.findMany({
        where: { predecessorId: food.id },
    });

    let types = categories.map((item) => item.successorId);
    const typesId = await Promise.all(
        types.map(
            async (item) => await db.food.findUnique({ where: { id: item } })
        )
    );

    const data = { item: food, status, categories: typesId };
    return json(data);
};

export default function Route() {
    const data = useLoaderData<ComponentProps<typeof Card>>();
    return (
        <>
            <Card {...data}></Card>
        </>
    );
}
