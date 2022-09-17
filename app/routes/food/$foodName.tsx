import { ComponentProps } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { json, MetaFunction } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/react/dist/routeModules";

import type { Food, Hierarchy, Status } from "@prisma/client";

import { Card } from "~/components/card";
import { db } from "~/utils/db.server";

import cardStyles from "~/styles/card.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: cardStyles }];
};

export const meta: MetaFunction = ({
  data,
}: {
  data: ComponentProps<typeof Card> | undefined;
}) => {
  if (!data) {
    return {
      title: "No food",
      description: "No joke found",
    };
  }
  return {
    title: `"${data.item?.name}" food`,
    description: `Find out about "${data.item?.name}" food`,
  };
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
      async (item) =>
        await db.food.findUnique({
          where: { id: item },
          select: { name: true, id: true },
        })
    )
  );

  const data = { item: food, status, categories: typesId };
  return json(data);
};

export function ErrorBoundary() {
  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}

export default function FoodName() {
  const data = useLoaderData<ComponentProps<typeof Card>>();
  return (
    <>
      <Card {...data}></Card>
    </>
  );
}
