import { useEffect, useRef, useState } from "react";
import { Link } from "@remix-run/react";

export const SearchBar = () => {
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
                return item.toLowerCase().includes(e.target.value)
                    ? item
                    : false;
            }
        });
        setFilteredItems(filteredResult);
    }
    console.log(filteredItems, allItemsRef.current);
    return (
        <div className="search">
            {popup ? (
                <article
                    className="popup"
                    aria-live="polite"
                    aria-atomic={true}
                    aria-label="Search"
                    aria-relevant="all"
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
                    autoComplete="off"
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
