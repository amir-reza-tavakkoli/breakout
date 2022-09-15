import { json, LoaderFunction } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  const foods = await db.food.findMany({ select: { name: true } });
  return json(foods.map((item) => item.name));
};
