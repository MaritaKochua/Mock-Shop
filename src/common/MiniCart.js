import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { generateCartItems } from "./generateCartItems";
class MiniCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.findPrice = this.findPrice.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.calculateTotalItems = this.calculateTotalItems.bind(this);
  }

  componentDidMount = () => {};

  findPrice(prices) {
    const currency = prices.find(
      (prod) => prod.currency.label === this.props.currency
    );
    return currency.currency.symbol + currency.amount;
  }

  calculateTotal() {
    let prices = 0;
    this.props.cart.map((item) => {
      const currency = item.prices.find(
        (prod) => prod.currency.label === this.props.currency
      );
      prices = Math.floor((prices + currency.amount * item.amount) * 100) / 100;
    });
    return prices;
  }

  calculateTotalItems() {
    let items = 0;
    this.props.cart.map((item) => (items += item.amount));
    return items;
  }
  render() {
    return (
      <div className="miniCartWindow">
        <h2>
          My Bag:
          {this.props.cart.length > 0 ? this.calculateTotalItems() : 0} items
        </h2>
        {this.props.cart.length > 0 &&
          generateCartItems(this.props.cart, this.findPrice)}
        {/* buttons */}
        <div>
          <Link to={"/cart"}>
            <button className="viewBagButton cartBTN">VIEW BAG</button>
          </Link>
          <Link to={""}>
            <button className="checkoutButton cartBTN">CHECKOUT</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currency: state.currency, cart: state.cart };
}

export default connect(mapStateToProps)(MiniCart);
