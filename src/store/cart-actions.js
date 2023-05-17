import { uiSliceAction } from "./ui-slice";
import { cartSliceAction } from "./cart-slice";
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiSliceAction.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-3a708-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiSliceAction.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiSliceAction.showNotification({
          status: "error",
          title: "Error!",
          message: error,
        })
      );
    }
  };
};
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-3a708-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };
    try {
      const dataCart = await fetchData();
      dispatch(
        cartSliceAction.replaceCart({
          items: dataCart.items || [],
          totalQuantity: dataCart.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiSliceAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};
