import { useEffect, useState } from "react";

import { LOCALSTORGAE_PREFIX } from "~/root";

export default function Home() {
    const [likedItems, setLikedItems] = useState<Array<string>>([]);
    useEffect(() => {
        const filteredItems = Object.keys(localStorage).filter((item) =>
            item.startsWith(LOCALSTORGAE_PREFIX)
        );
        if (filteredItems.length) {
            setLikedItems(filteredItems);
        } else {
            setLikedItems(["Nothing is found"]);
        }
    }, []);
    return (
        <div>
            <h1>faviorites:</h1>
            {likedItems && likedItems.length ? (
                likedItems.map((item) => <li>{item}</li>)
            ) : (
                <p>Nothing ...</p>
            )}
        </div>
    );
}
