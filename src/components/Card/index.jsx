import React from "react";
import { AppContext } from "../../App"
import styles from "./Card.module.scss"



function Card({ title, price, imgUrl, hidePlus }) {
  const {onPlus, cartItems, favoriteItems, onFavorite} = React.useContext(AppContext)

  const [checked, setChecked] = React.useState(false)
  const handleClick = () => {
    onPlus({title, price, imgUrl}, checked)
    setChecked(prev => !prev)
  }
  
  React.useEffect(() => {
    //check if item is in cart
    if(!cartItems.some((item) => item.imgUrl === imgUrl)) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  },[cartItems, imgUrl]) //we can remove imgUrl here

  React.useEffect(() => {
    //check if item is in favorites
    if(!favoriteItems.some((item) => item.imgUrl === imgUrl)) {
      setIsFavorite(false)
    } else {
      setIsFavorite(true)
    }
  }, [favoriteItems, imgUrl]) //we can remove imgUrl here
  
  const [isFavorite, setIsFavorite] = React.useState(false)
  const handleFavorite = () => {
    onFavorite({title, price, imgUrl}, isFavorite)
    setIsFavorite(prev => !prev)
  }
  return (
    <div className={styles.card}>
      <button className={styles.card__favorite} onClick={handleFavorite}>
        <img src={isFavorite ? 'img/heart-checked.svg' : 'img/heart-unchecked.svg'} alt="favorite"/>
      </button> 
      <img src={imgUrl} alt="shoes"/>
      <p className={styles.card__name}>{title}</p>
      <div className={styles.card__bottom}>
        <div >
          <p>Price</p>
          <span className={styles.card__bottomPrice}>{price}$</span>
        </div>
        {!hidePlus && <button onClick={handleClick}>
          <img  style={{width:'100%', height:'100%'}} 
                src={checked ? 'img/checked.svg' : 'img/plus.svg'}
                alt="add" />
        </button>}
      </div>
    </div>
  );
}

export default Card;