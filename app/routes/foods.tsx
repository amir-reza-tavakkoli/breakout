import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { LoaderFunction, json, MetaFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/react/dist/routeModules";

import type { Food } from "@prisma/client";

import { db } from "~/utils/db.server";

import styles from "~/styles/foods.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

type LoaderData = {
  foods: Array<Pick<Food, "name" | "avatarUrl" | "statusId">> | null;
};

type LoaderDataExtended = {
  foods: Array<
    Pick<Food, "name" | "avatarUrl" | "statusId"> & {
      status: string;
    }
  > | null;
};

export const meta: MetaFunction = ({}) => ({
  title: `Some foods`,
  description: `Here are some random foods`,
});

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    foods: await db.food.findMany({
      take: 6,
      select: { name: true, statusId: true, avatarUrl: true },
    }),
  };

  if (!data.foods) {
      throw new Response("Not found.", {
          status: 404,
      });
  }

  const withStatus = await Promise.all(
    data.foods.map(async (item) => {
      return {
        name: item.name,
        avatarUrl: item.avatarUrl,
        statusId: item.statusId,
        status:
          (
            await db.status.findUnique({
              where: { id: item.statusId },
            })
          )?.overall ?? "Unknown",
      };
    })
  );
  return json({ foods: withStatus });
};


export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 404) {
        return <div className="error-container">No food found</div>;
    }
    throw new Error(`Unexpected caught response with status: ${caught.status}`);
}


export function ErrorBoundary() {
  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}

export default function Foods() {
  const data = useLoaderData<LoaderDataExtended>();

  const url =
    "https://ik.imagekit.io/jqgidj1tv/pizza_1_2sezNde1j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662724762664";

  return (
    <ul className="list">
      {data.foods &&
        data.foods.map((food, index) => (
          <li key={index}>
            <Link prefetch="intent" to={"/food" + "/" + food.name}>
              <span>
                {food.avatarUrl || url ? (
                  <img src={url || food.avatarUrl} alt="" />
                ) : null}
                <span className="_name">{food.name}</span>
              </span>
              <span className="_overall">{food.status}</span>
            </Link>
          </li>
        ))}
    </ul>
  );
}
