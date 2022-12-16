import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://react-http-179c3-default-rtdb.firebaseio.com/cart.json");
            if(!response.ok) {
                throw new Error("Fetching Failed");
            }
            const data = await response.json();

            return data;
        };
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message:"Sending Cart data failed !"
            }));
        }
    }
}



export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending the data..."
        }));

        const sendRequest = async () => {
            const response = await fetch("https://react-http-179c3-default-rtdb.firebaseio.com/cart.json", {
            method: "PUT",
            body: JSON.stringify(cart),
            });
        
            if (!response.ok) {
              throw new Error();
            }
        }

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Data sent Successfully!"
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message:"Sending Cart data failed !"
            }));
        }        

        dispatch(uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Data sent Successfully!"
        }));
    }
}