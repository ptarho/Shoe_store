import Card from "../components/Card";

function Favorites({ items }) {
  return (
    <>
      <div className="shoes__header">
        <h1>Favorites</h1>
      </div>
      <div className="shoes__content">
        {items.map((item) => {
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

export default Favorites;
