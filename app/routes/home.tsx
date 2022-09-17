import { useEffect, useState } from "react";
import { LinksFunction, MetaFunction } from "@remix-run/node";

import { LOCALSTORGAE_PREFIX } from "~/root";
import { Link } from "@remix-run/react";

import styles from "~/styles/home.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = ({}) => ({
  title: `Favourite foods`,
  description: `Here are some liked foods`,
});

export default function Home() {
  const [likedItems, setLikedItems] = useState<Array<string>>([]);
  useEffect(() => {
    const filteredItems = Object.keys(localStorage).filter((item) =>
      item.startsWith(LOCALSTORGAE_PREFIX)
    );

    if (filteredItems.length) {
      setLikedItems(
        filteredItems.map((item) => item.slice(LOCALSTORGAE_PREFIX.length))
      );
    } else {
      setLikedItems(["Nothing is found"]);
    }
  }, []);

  return (
    <div className="home">
      <p>Faviorites:</p>
      <ul>
        {likedItems && likedItems.length ? (
          likedItems.map((item, index) => (
            <>
              <li className="_item">
                <Link to={"/food/" + item} key={index}>
                  {item}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14.43 5.93L20.5 12l-6.07 6.07M3.5 12h16.83"
                        stroke="#292D32"
                        strokeWidth={1.5}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            </>
          ))
        ) : (
          <p>Nothing ...</p>
        )}
      </ul>
    </div>
  );
}
