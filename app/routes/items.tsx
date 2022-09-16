import { json, LoaderFunction } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
    const foods = await db.food.findMany({ select: { name: true } });

    if (!foods || !Array.isArray(foods)) {
        throw new Response("Not found.", {
            status: 404,
        });
    }
    return json(foods.map((item) => item.name));
};
