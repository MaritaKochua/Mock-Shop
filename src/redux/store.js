import { createStore, combineReducers } from 'redux'

export const changeCurrency = (currency) => {
  return {
    type: 'CHANGE_CURRENCY',
    payload: currency
  }
}

export const addToCart = (itemObject) => {
  return {
    type: 'ADD_TO_CART',
    payload: itemObject
  }
}

export const removeFromCart = (itemObject) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: itemObject
  }
}

const changeCurrencyReducer = (oldCurrency = 'USD', action) => {
  if (action.type === 'CHANGE_CURRENCY') {
    return action.payload
  }
  return oldCurrency
}
const updateCartReducer = (oldArray = [], action) => {
  if (action.type === 'ADD_TO_CART') {
    console.log(oldArray)
    // check if similar product is in cart
    if (oldArray.find((itm) => itm.id === action.payload.id)) {
      const newArray = [...oldArray]
      const arrayOfSameProducts = newArray.filter(
        (item) => item.id === action.payload.id
      )
      // check if it has same attributes
      function checkIfSameAttributes (arr) {
        return arr.attributes.every((attr, index) => {
          return attr.items.every((element) => {
            const foundChosenAttr = action.payload.attributes[index].items.find(
              (item) => item.id === element.id
            )
            return foundChosenAttr.isChosen === element.isChosen
          })
        })
      }
      // check for every found item
      const findTheSameArray = arrayOfSameProducts.findIndex((array) => {
        return checkIfSameAttributes(array)
      })
      if (findTheSameArray !== -1) {
      // found item with same attributes- just increase amount
        newArray[findTheSameArray].amount =
          newArray[findTheSameArray].amount + 1
        return newArray
      } else {
      // different attributes - add new item
        const cartItem = { ...action.payload, amount: 1, uniqueId: Date.now() }
        return [...oldArray, { ...cartItem, uniqueId: Date.now() }]
      }
    // eslint-disable-next-line brace-style
    }
    // nothing in cart - just add a new item
    else {
      const cartItem = { ...action.payload, amount: 1 }
      return [...oldArray, { ...cartItem, uniqueId: Date.now() }]
    }
  } else if (action.type === 'REMOVE_FROM_CART') {
    const arrayCopy = [...oldArray]
    const itemIndex = arrayCopy.findIndex(
      (itm) => itm.id === action.payload.id
    )
    if (arrayCopy[itemIndex]?.amount === 1) {
      const newArray = arrayCopy.filter((arr) => arr?.id !== action.payload.id)
      return newArray
    } else {
      const amount = arrayCopy[itemIndex]?.amount - 1
      arrayCopy[itemIndex] = { ...arrayCopy[itemIndex], amount: amount }
      return arrayCopy
    }
  }
  return oldArray
}

const rootReducer = combineReducers({
  currency: changeCurrencyReducer,
  cart: updateCartReducer
})

export default createStore(rootReducer)
