import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Food } from "@prisma/client";

import stylesUrl from "~/styles/foods.css";
import { db } from "~/utils/db.server";
import { LinksFunction } from "@remix-run/react/dist/routeModules";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

// type LoaderData = {
//     foods: Array<{name:string,avatarUrl : string,statusId:string} > | null;
// };
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

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    foods: await db.food.findMany({
      take: 6,
      select: { name: true, statusId: true, avatarUrl: true },
    }),
  };

  if (!data.foods) {
    throw new Error("no food");
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

export default function Foods() {
  const data = useLoaderData<LoaderDataExtended>();
  console.log(data);
  return (
    <ul className="list">
      {data.foods &&
        data.foods.map((food, index) => (
          <li key={index}>
            <Link to={"/food" + "/" + food.name}>
              <span>
                {food.avatarUrl ? <img src={food.avatarUrl} alt="" /> : null}
                <span className="name">{food.name}</span>
              </span>
              <span className="overall">{food.status}</span>
            </Link>
          </li>
        ))}
    </ul>
  );
}
