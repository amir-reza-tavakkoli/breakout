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
        <dl className="card" aria-label="Item">
            <dt className="nonvisual">Name</dt>
            <dd className="name">{item.name}</dd>

            <dt className="nonvisual">Type</dt>
            <dd className="nonvisual">{type}</dd>

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
            {!item.isCategory && categories && categories.length ? (
                <>
                    <dt className="nonvisual">categories</dt>
                    <dd className="categories">
                        <ul>
                            {categories.map((item, index) =>
                                item.name ? (
                                    <li key={index}>
                                        <a href={"/food/" + item.name}>
                                            {item.name}
                                        </a>
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
