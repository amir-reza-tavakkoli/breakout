import { useEffect, useRef, useState } from "react";
import { Link } from "@remix-run/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const iconVariant = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
  },
};

export const SearchBar = () => {
  const shouldReduceMotion = useReducedMotion();

  const [popup, setPopup] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<Array<string>>([]);
  const [fetchError, setfetchError] = useState<boolean>(false);
  // : ChangeEventHandler<HTMLInputElement>
  const allItemsRef = useRef<Array<string>>([]);

  async function fetchItems() {
    const response = await fetch("/items");

    if (!response.ok) {
      setfetchError(true);
      throw new Error("Bad request");
    }

    if (fetchError) {
      setfetchError(false);
    }

    const json = await response.json();

    if (!Array.isArray(json)) {
      throw new Error("Bad response");
    }

    json.map((item: string) => {
      if (item && typeof item === "string") return item.toLowerCase();
    });

    allItemsRef.current = json;
  }

  useEffect(() => {
    (async () => await fetchItems())();
  }, [allItemsRef]);

  function closePopup() {
    if (popup) {
      setPopup(false);
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    e.target.value ? setPopup(true) : setPopup(false);

    const filteredResult = allItemsRef.current.filter((item) => {
      if (item && typeof item === "string") {
        return item.toLowerCase().includes(e.target.value) ? item : false;
      }
    });
    setFilteredItems(filteredResult);
  }
  console.log(filteredItems, allItemsRef.current);
  return (
    <motion.div
      initial={{ y: shouldReduceMotion ? undefined : 400 }}
      animate={{ y: 0 }}
      className="search"
    >
      <AnimatePresence>
        {popup ? (
          <motion.article
            className="popup"
            aria-live="polite"
            aria-atomic={true}
            aria-label="Search"
            aria-relevant="all"
            initial={{ y: shouldReduceMotion ? undefined : "100%" }}
            animate={{ y: "-100%" }}
            exit={{ y: shouldReduceMotion ? undefined : "50vh" }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <p className="nonvisual">Result:</p>
            {!fetchError ? (
              <>
                {filteredItems.length > 0 ? (
                  <ul>
                    {filteredItems.map((item, index) => (
                      <Link
                        key={index}
                        to={"/food/" + item}
                        onClick={closePopup}
                      >
                        <li>{item}</li>
                      </Link>
                    ))}
                  </ul>
                ) : (
                  <p>Nothing found</p>
                )}
              </>
            ) : (
              <>
                <p>Error occured </p>
                <button type="button" onClick={fetchItems}>
                  Try Again
                </button>
              </>
            )}
          </motion.article>
        ) : null}
      </AnimatePresence>
      <form action="\" method="post">
        <label htmlFor="__search" className="nonvisual">
          Search items
        </label>
        <input
          onChange={handleSearch}
          type="search"
          name="search"
          id="__search"
          placeholder="Search items ..."
          autoComplete="off"
        />
        <button type="submit">
          <span className="nonvisual">Submit Search</span>
          <motion.svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <motion.path
              d="M12.5 21a9.5 9.5 0 110-19 9.5 9.5 0 010 19zM2 22l2-2"
              variants={iconVariant}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 1, ease: "easeInOut" },
                fill: { duration: 1, ease: [1, 0, 0.8, 1] },
              }}
              stroke="#292D32"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="transparent"
              style={{ fill: "transparent" }}
            />
          </motion.svg>
        </button>
      </form>
    </motion.div>
  );
};
