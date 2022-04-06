import { createStore, combineReducers } from "redux";

export const changeCurrency = (currency) => {
  return {
    type: "CHANGE_CURRENCY",
    payload: currency,
  };
};

export const addToCart = (itemObject) => {
  return {
    type: "ADD_TO_CART",
    payload: itemObject,
  };
};

export const removeFromCart = (itemObject) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: itemObject,
  };
};

const changeCurrencyReducer = (oldCurrency = "USD", action) => {
  if (action.type === "CHANGE_CURRENCY") {
    return action.payload;
  }
  return oldCurrency;
};
const updateCartReducer = (oldArray = [], action) => {
  if (action.type === "ADD_TO_CART") {
    if (oldArray.find((itm) => itm.id === action.payload.id)) {
      const newArray = [...oldArray];
      let cartItemIndex = newArray.findIndex(
        (item) => item.id === action.payload.id
      );

      newArray[cartItemIndex].amount = newArray[cartItemIndex].amount + 1;

      return newArray;
    } else {
      const cartItem = { ...action.payload, amount: 1 };
      return [...oldArray, cartItem];
    }
  } else if (action.type === "REMOVE_FROM_CART") {
    const arrayCopy = [...oldArray];
    const itemIndex = arrayCopy.findIndex(
      (itm) => itm.id === action.payload.id
    );
    if (arrayCopy[itemIndex]?.amount === 1) {
      let newArray = arrayCopy.filter((arr) => arr?.id !== action.payload.id);
      return newArray;
    } else {
      let amount = arrayCopy[itemIndex]?.amount - 1;
      arrayCopy[itemIndex] = { ...arrayCopy[itemIndex], amount: amount };
      return arrayCopy;
    }
  }
  return oldArray;
};

const rootReducer = combineReducers({
  currency: changeCurrencyReducer,
  cart: updateCartReducer,
});

export default createStore(rootReducer);
