import React from "react";
import { Routes, Route } from "react-router-dom";
//components
import Header from "./components/Header";
import Cart from "./components/Cart";
//pages for react-router
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";


export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]); //state of all items on site
  const [cartOpened, setCartOpened] = React.useState(false); //state to open/close cart
  const [cartItems, setCartItems] = React.useState([]); //state of all items added to cart
  const [searchValue, setSearchValue] = React.useState("");
  const [favoriteItems, setFavoriteItems] = React.useState([]); //state of all items added to cart
  const [orders, setOrders] = React.useState([])
  const [sum, setSum] = React.useState(0)
  
  React.useEffect(() => {
    fetch("https://run.mocky.io/v3/c593e428-3294-4dfb-b8a9-eb9bd9e3da7a")
      .then((res) => res.json())
      .then((data) => setItems(data));
    
    const lsCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(lsCartItems)

    const lsFavoriteItems = JSON.parse(localStorage.getItem("favoriteItems") || "[]");
    setFavoriteItems(lsFavoriteItems)

    const lsOrders = JSON.parse(localStorage.getItem("orders") || "[]"); 
    setOrders(lsOrders)

  }, []);

  const renderCart = () => {
    setCartOpened((prev) => !prev);
  };

  const onPlus = (obj, option) => {
    if (!option) {
      setCartItems((prev) => [...prev, obj]);
      localStorage.setItem("cartItems", JSON.stringify([...cartItems, obj]));
      //addToCard(userId, obj)
    } else {
      setCartItems((prev) => {
        const newCartItems = prev.filter((item) => item.imgUrl !== obj.imgUrl);
        return [...newCartItems];
      });
      const newLSCartItems = cartItems.filter(
        (item) => item.imgUrl !== obj.imgUrl
      );
      localStorage.setItem("cartItems", JSON.stringify([...newLSCartItems]));
    }
  };

  const removeCartItem = (imgUrl) => {
    setCartItems((prev) => {
      const newCartItems = prev.filter((item) => item.imgUrl !== imgUrl);
      return [...newCartItems];
    });
    const newLSCartItems = cartItems.filter((item) => item.imgUrl !== imgUrl);
    localStorage.setItem("cartItems", JSON.stringify([...newLSCartItems]));
  };

  const onSearch = (e) => {
    const input = e.target.value;
    setSearchValue(input);
  };

  const onFavorite = (obj, option) => {
    if (!option) {
      setFavoriteItems((prev) => [...prev, obj]);
      localStorage.setItem("favoriteItems", JSON.stringify([...favoriteItems, obj]));
    } else {
      setFavoriteItems((prev) => {
        const newFavoriteItems = prev.filter((item) => item.imgUrl !== obj.imgUrl);
        return [...newFavoriteItems];
      });
      const newLSFavoriteItems = favoriteItems.filter(
        (item) => item.imgUrl !== obj.imgUrl
      );
      localStorage.setItem("favoriteItems", JSON.stringify([...newLSFavoriteItems]));
    }
  };

  const handleOrder = () => {
    setOrders(prev => {
      const oldOrders = [...prev] 
      return [...oldOrders, [...cartItems]]
    });
    const oldOrders = [...orders] 
    localStorage.setItem("orders", JSON.stringify([...oldOrders, [...cartItems]]))
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
  }

  React.useEffect(() => {
    const totalSum = cartItems.reduce((sum,item) => sum += item["price"], 0)
    setSum(totalSum)
  }, [cartItems])

  return (
    <AppContext.Provider value={{ removeCartItem, onPlus, cartItems, favoriteItems, onFavorite }}>
      <div className="wrapper">
        {cartOpened && <Cart closeCart={renderCart} items={cartItems} onOrder={handleOrder} sum={sum} />}

        <Header onClick={renderCart} sum={sum} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                onSearch={onSearch}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                items={favoriteItems}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <Orders
                orders={orders}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
