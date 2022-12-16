import { useEffect, Fragment } from "react";
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {

  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);


  useEffect(() => {
    dispatch(fetchCartData());
  }, [])
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));

  }, [cart, dispatch]);

  // useEffect(() => {
  //   const sendCartData = async() => {
  //     dispatch(uiActions.showNotification({
  //       status: "pending",
  //       title: "Sending...",
  //       message: "Sending the data..."
  //     }));

  //     const response = await fetch("https://react-http-179c3-default-rtdb.firebaseio.com/cart.json", {
  //       method: "PUT",
  //       body: JSON.stringify(cart),
  //     });

  //     if (!response.ok) {
  //       throw new Error();
  //     }

  //     dispatch(uiActions.showNotification({
  //       status: "success",
  //       title: "Success!",
  //       message: "Data sent Successfully!"
  //     }));
  //   }

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) => {      
  //     dispatch(uiActions.showNotification({
  //       status: "error",
  //       title: "Error!",
  //       message:"Sending Cart data failed !"
  //     })); 
  //   });

  // }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification {...notification}/>}
      <Layout>      
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App; 
