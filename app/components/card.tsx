import { useState } from "react";
import type { Food, Status } from "@prisma/client";

type CardProps = {
    item: Food;
    categories: Food[] | [];
    status: Pick<Status, "overall" | "advice">;
    type?: string;
};

export const Card = ({ item, categories, status, type }: CardProps) => {
    const [liked, setLiked] = useState<boolean>(
        typeof window !== "undefined" && !!localStorage.getItem(item.name)
    );

    function handleLike() {
        if (typeof window === "undefined") {
            throw new Error("Window is not defined");
        }

        if (liked) {
            localStorage.removeItem(item.name);
            setLiked(false);
        } else {
            localStorage.setItem(item.name, "true");
            setLiked(true);
        }
    }
    const url =
        "https://ik.imagekit.io/jqgidj1tv/pizza_1_2sezNde1j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662724762664";

    return (
        <dl className="card" aria-label="Item">
            <dt className="nonvisual">Name</dt>
            <dd className="name">{item.name}</dd>

            <dt className="nonvisual">Type</dt>
            <dd className="nonvisual">{type ?? "Food"}</dd>

            {item.avatarUrl ? (
                <>
                    <dt className="nonvisual">Avatar</dt>
                    <dd className="img">
                        <img src={url} alt="" role="presentation" />
                    </dd>
                </>
            ) : null}
            {status.overall ? (
                <>
                    <dt className="nonvisual">Overall</dt>
                    <dd className="overall">{status.overall}</dd>
                </>
            ) : null}

            {status.advice ? (
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
                <button type="button" onClick={handleLike}>
                    <span className="nonvisual">Like Item</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        role="presentation"
                    >
                        <path
                            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                            stroke="#292D32"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            fill={liked ? "red" : undefined}
                            d="M12.33 17.45c-.18.06-.49.06-.67 0-1.56-.53-5.06-2.76-5.06-6.54 0-1.67 1.34-3.02 3-3.02.98 0 1.85.47 2.4 1.21.54-.73 1.42-1.21 2.4-1.21 1.66 0 3 1.35 3 3.02 0 3.78-3.5 6.01-5.07 6.54z"
                            stroke="#292D32"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </dd>
        </dl>
    );
};
