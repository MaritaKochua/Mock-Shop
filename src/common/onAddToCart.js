import store, { addToCart } from "../redux/store";

export function onAddToCart(product, chosenAttributes) {
  const itemToSend = { ...product };

  let newAttr = itemToSend.attributes.map((attr) => {
    const attrSetIndex = chosenAttributes.findIndex(
      (i) => i.name === attr.name
    );
    const newAttrItems = attr.items.map((item) => {
      if (item.id === chosenAttributes[attrSetIndex]?.value) {
        return { ...item, isChosen: true };
      } else {
        return item;
      }
    });
    return { ...attr, items: newAttrItems };
  });
  store.dispatch(addToCart({ ...itemToSend, attributes: newAttr }));
}
