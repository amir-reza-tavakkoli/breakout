import { Food, Status } from "@prisma/client";

type CardProps = {
    food: Food;
    types: Food[] | []
    status: Pick<Status, "overall" | "advice"> | null
};

export const Card = ({ food, types, status }: CardProps) => {
    const url =
        "https://ik.imagekit.io/jqgidj1tv/pizza_1_2sezNde1j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662724762664";
    return (
        <article className="card">
            <dl>
                <dt className="nonvisual">Name</dt>
                <dd className="name">{food.name}</dd>

                <dt className="nonvisual">Avatar</dt>
                <dd className="img">
                    <img src={url} alt="" />
                </dd>
                <dt className="nonvisual">Overall</dt>
                <dd className="overall">{status?.overall}</dd>
                <dt className="nonvisual">Advice</dt>
                <dd className="advice">{status?.advice}</dd>
                <dt className="nonvisual">Types</dt>
                <dd className="list">
                    <ul>
                        {types!.map((item) => <li> {item.name }</li>)}
                    </ul>
                </dd>
                <dt className="nonvisual">Description</dt>
                <dd className="description">{food.description}</dd>
            </dl>
        </article>
    );
};
