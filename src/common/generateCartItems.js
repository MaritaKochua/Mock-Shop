import { generateAttributes } from "./generateAttributes";
import store, { addToCart, removeFromCart } from "../redux/store";

export function generateCartItems(cart, pricesFunc) {
  return cart.map((item) => {
    return (
      <div key={item.id} className="cartMiniItem ">
        <div className="divColumn">
          <p>{item.brand}</p>
          <p>{item.name}</p>
          <span className="priceTagMini">{pricesFunc(item.prices)}</span>
          {/* attributes */}
          {item.attributes.map((attrSet) => {
            return (
              <div key={attrSet.id} className="attributeGroup miniCartAttr">
                {generateAttributes(attrSet, null, item.id)}
              </div>
            );
          })}
        </div>
        {/* amounts */}
        <div className="flexRow">
          <div className="divColumn cartItemAmounts">
            <span
              className="button"
              onClick={() => store.dispatch(addToCart(item))}
            >
              +
            </span>
            <p>{item.amount}</p>
            <span
              className="button"
              onClick={() => store.dispatch(removeFromCart(item))}
            >
              -
            </span>
          </div>
          <div
            className="divColumn cartItemPhoto"
            style={{ backgroundImage: `url(${item.gallery[0]})` }}
          ></div>
        </div>
      </div>
    );
  });
}
