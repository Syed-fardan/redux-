import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
//import { uiSliceAction } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-actions";
import { fetchCartData } from "./store/cart-actions";
let isInitial = true;
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  useEffect(() => {
    // const sentCartData = async () => {
    //   dispatch(
    //     uiSliceAction.showNotification({
    //       status: "pending",
    //       title: "Sending...",
    //       message: "Sending cart data!",
    //     })
    //   );
    //   const response = await fetch(
    //     "https://react-http-3a708-default-rtdb.firebaseio.com/cart.json",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error("Sending cart data failed!");
    //   }
    //   dispatch(
    //     uiSliceAction.showNotification({
    //       status: "success",
    //       title: "Success!",
    //       message: "Sent cart data successfully!",
    //     })
    //   );
    // };

    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

    // sentCartData().catch((error) => {
    //   dispatch(
    //     uiSliceAction.showNotification({
    //       status: "error",
    //       title: "Error!",
    //       message: error,
    //     })
    //   );
    // });
  }, [dispatch, cart]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
