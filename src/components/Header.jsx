import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <div className="header__info">
          <img src="/img/logo.svg" alt="logo" />
          <div className="header__name">
            <h2>Store name</h2>
            <p>Shoes for all!</p>
          </div>
        </div>
      </Link>

      <ul className="header__btns">
        <li>
          <span> {props.sum} $</span>
        </li>
        <li>
          <img onClick={props.onClick} src="/img/cart.svg" alt="cart list" />
        </li>

        <li>
          <Link to="/favorites">
            <img src="/img/favorite.svg" alt="favorite" />
          </Link>
        </li>

        <li>
          <Link to="/orders">
            <img src="/img/profile.svg" alt="profile" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
