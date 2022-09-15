import {
  ChangeEventHandler,
  EventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "@remix-run/react";

export const SearchBar = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<Array<string>>([]);
  // : ChangeEventHandler<HTMLInputElement>
  const allItemsRef = useRef<Array<string>>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/items");
        const json = await response.json();
        json.map((item: string) => {
          if (item && typeof item === "string") return item.toLowerCase();
        });
        allItemsRef.current = json;
      } catch (error) {}
    })();
  }, [allItemsRef]);

  function closePopup() {
    if (popup) {
      setPopup(false);
    }
  }
  // React.ChangeEvent <
  //     HTMLElement >
  function handleSearch(e: any) {
    e.preventDefault();
    e.target.value ? setPopup(true) : setPopup(false);
    console.log(filteredItems);
    let filteredResult = allItemsRef.current.filter((item) => {
      if (item && typeof item === "string") {
        return item.toLowerCase().includes(e.target.value) ? item : false;
      }
    });
    console.log("ss is", filteredResult);
    setFilteredItems(filteredResult);
  }
  return (
    <div className="search">
      {popup ? (
        <article
          className="popup"
          aria-live="polite"
          aria-atomic={true}
          aria-label="Search "
          aria-relevant="all"
        >
          <p className="nonvisual">Result:</p>
          {allItemsRef.current.length > 0 ? (
            <>
              {filteredItems.length > 0 ? (
                <ul>
                  {filteredItems.map((item, index) => (
                    <Link key={index} to={"/food/" + item} onClick={closePopup}>
                      <li>{item}</li>
                    </Link>
                  ))}
                </ul>
              ) : (
                <p>Nothing ...</p>
              )}
            </>
          ) : (
            <p>Searcing ...</p>
          )}
        </article>
      ) : null}
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
        />
        <button type="submit">
          <span className="nonvisual">Submit Search</span>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path
              d="M12.5 21a9.5 9.5 0 110-19 9.5 9.5 0 010 19zM2 22l2-2"
              stroke="#292D32"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
