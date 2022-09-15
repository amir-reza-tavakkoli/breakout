import type { Food, Status } from "@prisma/client";
import { Like } from "./like";

type CardProps = {
  item: Food;
  categories: Food[];
  status?: Pick<Status, "overall" | "advice"> | null;
  type?: string;
};

export const Card = ({ item, categories, status, type }: CardProps) => {
  const url =
    "https://ik.imagekit.io/jqgidj1tv/pizza_1_2sezNde1j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662724762664";

  console.log(categories);
  return (
    <dl className="card" aria-label="Item">
      <dt className="nonvisual">Name</dt>
      <dd className="name">{item.name}</dd>

      <dt className="nonvisual">Type</dt>
      <dd className="nonvisual">{type ?? "Food"}</dd>

      {item.avatarUrl || url ? (
        <>
          <dt className="nonvisual">Avatar</dt>
          <dd className="img">
            <img src={url} alt="" role="presentation" />
          </dd>
        </>
      ) : null}
      {status && status.overall ? (
        <>
          <dt className="nonvisual">Overall</dt>
          <dd className="overall">{status.overall}</dd>
        </>
      ) : null}

      {status && status.advice ? (
        <>
          <dt className="nonvisual">Advice</dt>
          <dd className="advice">{status.advice}</dd>
        </>
      ) : null}
      {categories && categories.length ? (
        <>
          <dt className="nonvisual">categories</dt>
          <dd className="categories">
            <ul>
              {categories.map((item, index) => (
                <li key={index}> {item.name}</li>
              ))}
            </ul>
          </dd>
        </>
      ) : null}
      {item.description ? (
        <>
          <dt className="nonvisual">Description</dt>
          <dd className="description">{item.description}</dd>
        </>
      ) : null}
      <dt className="nonvisual">Favourite</dt>
      <dd className="heart">
        <Like name={item.name}></Like>
      </dd>
    </dl>
  );
};
