import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@remix-run/react";

import type { Food, Status } from "@prisma/client";
import { Like } from "./like";

type CardProps = {
  item: Food;
  categories?: Food[];
  status?: Pick<Status, "overall" | "advice"> | null;
  type?: string;
};

const url =
  "https://ik.imagekit.io/jqgidj1tv/pizza_1_2sezNde1j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662724762664";

export const Card = ({
  item,
  categories,
  status,
  type = "Food",
}: CardProps) => {
  return (
    <AnimatePresence>
      <motion.dl
        className="card"
        aria-label="Item"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        exit={{ opacity: 0 }}
      >
        <dt className="nonvisual">Name</dt>
        <dd className="_name">{item.name}</dd>

        <dt className="nonvisual">Type</dt>
        <dd className="nonvisual">{type}</dd>

        {item.avatarUrl || url ? (
          <>
            <dt className="nonvisual">Avatar</dt>
            <dd className="_img">
              <img src={url} alt="" role="presentation" />
            </dd>
          </>
        ) : null}
        {status && status.overall ? (
          <>
            <dt className="nonvisual">Overall</dt>
            <dd className="_overall">{status.overall}</dd>
          </>
        ) : null}

        {status && status.advice ? (
          <>
            <dt className="nonvisual">Advice</dt>
            <dd className="_advice">{status.advice}</dd>
          </>
        ) : null}
        {!item.isCategory && categories && categories.length ? (
          <>
            <dt className="nonvisual">categories</dt>
            <dd className="_categories">
              <ul>
                {categories.map((item, index) =>
                  item.name ? (
                    <li key={index}>
                      <Link to={"/food/" + item.name}>{item.name}</Link>
                    </li>
                  ) : null
                )}
              </ul>
            </dd>
          </>
        ) : null}
        {item.description ? (
          <>
            <dt className="nonvisual">Description</dt>
            <dd className="_description">{item.description}</dd>
          </>
        ) : null}
        <dt className="nonvisual">Favourite</dt>
        <dd className="_heart">
          <Like name={item.name}></Like>
        </dd>
      </motion.dl>
    </AnimatePresence>
  );
};
