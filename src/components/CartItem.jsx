import React from "react";
import { AppContext } from "../App"

function CartItem({ imgUrl, title, price}) {
  const {removeCartItem} = React.useContext(AppContext)

  return (
    <div className="cart__item">
      <img
        className="cart__itemImg"
        src={imgUrl}
        alt="sneakers"
      />
      <div className="cart__itemInfo">
        <p>{title}</p>
        <span>{price}$</span>
      </div>
      <button onClick={() => removeCartItem(imgUrl)}>
        <img src="img/delete.svg" alt="delete" />
      </button>
    </div>
  );
}
export default CartItem;