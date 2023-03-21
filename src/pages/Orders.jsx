import Card from "../components/Card";

function Orders({ orders }) {
  return (
    <>
      <div className="shoes__header">
        <h1>Orders</h1>
      </div>
      <div className="orders__content">
        {orders.map((order, idx) => {
          return (
            <div className="order">
              <h2 className="order__title">Order #{idx + 1}</h2>
              <div className="order__items">
                {order.map((item) => {
                  return (
                    <Card
                      key={item.imgUrl}
                      title={item.title}
                      price={item.price}
                      imgUrl={item.imgUrl}
                      hidePlus={true}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Orders;
