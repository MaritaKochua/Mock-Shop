import React from "react";
import { connect } from "react-redux";
import { generateCartItems } from "./common/generateCartItems";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.findPrice = this.findPrice.bind(this);
  }
  findPrice(prices) {
    const currency = prices.find(
      (prod) => prod.currency.label === this.props.currency
    );
    return currency.currency.symbol + currency.amount;
  }
  render() {
    return (
      <div className="pageContainer cartPage">
        <h1>CART</h1>
        {generateCartItems(this.props.cart, this.findPrice)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currency: state.currency, cart: state.cart };
}

export default connect(mapStateToProps)(CartPage);
