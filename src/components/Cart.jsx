import CartItem from "./CartItem";

function Cart({ closeCart, items = [], onOrder, sum}) {
  return (
    <div className="overlay" onClick={closeCart}>
      <div className="cart" onClick={(e) => e.stopPropagation()}>
        <h2>
          Cart
          <img onClick={closeCart} src="img/delete.svg" alt="delete" />
        </h2>

        {!items.length ? (
          <div className="cart-empty">
            <img src="img/cart-empty.png" alt="empty cart" />
            <h2>Cart is empty</h2>
            <button onClick={closeCart}>Close cart</button>
          </div>
        ) : (
          <>
            <div className="cart__items">
              {items.map((item) => {
                return <CartItem 
                key={item.imgUrl}
                imgUrl={item.imgUrl}
                title={item.title}
                price={item.price}/>
              })}
            </div>

            <div className="cart__bottom" >
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>{sum} $</b>
                </li>
                <li>
                  <span>Fee 5%:</span>
                  <div></div>
                  <b>{Math.round(sum*0.05)} $</b>
                </li>
              </ul>
              <button className="cart__checkout" onClick={onOrder}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
