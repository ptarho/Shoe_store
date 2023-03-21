import Card from "../components/Card";

function Home({ items, onSearch, searchValue, setSearchValue }) {
  return (
    <>
      <div className="shoes__header">
        <h1>{searchValue ? `Search by "${searchValue}"` : "All shoes"}</h1>
        <div className="search">
          <img src="img/search.svg" alt="search" />
          {searchValue && (
            <button class="clearInput" onClick={() => setSearchValue("")}>
              <img src="img/delete.svg" alt="delete" />
            </button>
          )}
          <input
            placeholder="Search..."
            onChange={onSearch}
            value={searchValue}
          />
        </div>
      </div>
      <div className="shoes__content">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => {
            return (
              <Card
                key={item.imgUrl}
                title={item.title}
                price={item.price}
                imgUrl={item.imgUrl}
              />
            );
          })}
      </div>
    </>
  );
}

export default Home;
