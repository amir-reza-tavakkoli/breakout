export const SearchBar = () => {
    return (
        <div className="search">
            <form action="">
                <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Search items ..."
                />
                <button type="submit">
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
