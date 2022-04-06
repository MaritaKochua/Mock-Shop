import React from "react";
import { connect } from "react-redux";
import cart from "./img/cart.svg";
import { generateAttributes } from "./generateAttributes";
import { Link } from "react-router-dom";
import { onAddToCart } from "./onAddToCart";

class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false, attributes: [] };
    this.findPrice = this.findPrice.bind(this);
    this.onChangeAttr = this.onChangeAttr.bind(this);
  }
  componentDidMount() {
    const attributes = [];
    this.props.product.attributes.map((attr) =>
      attributes.push({ name: `${this.props.product.id}${attr.name}` })
    );
    this.setState({ attributes: attributes, isButtonDisabled: false });
  }
  findPrice() {
    const currency = this.props.product.prices.find(
      (prod) => prod.currency.label === this.props.currency
    );
    return currency.currency.symbol + currency.amount;
  }

  onChangeAttr(e) {
    let newAttrArray = { ...this.state.attributes };
    const objIndex = this.state.attributes.findIndex(
      (obj) => obj.name === e.target.name
    );
    newAttrArray[objIndex].value = e.target.value;
  }
  render() {
    return (
      <div
        className={`${"itemTile"} ${
          !this.props.product.inStock && "outOfStock"
        }`}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <span
          className={
            this.props.product.inStock ? "displayNone" : "outOfStockText"
          }
        >
          OUT OF STOCK
        </span>
        <Link
          to={this.props.product.inStock && `items/${this.props.product.id}`}
        >
          <div
            className="itemTileImg"
            style={{ backgroundImage: `url(${this.props.product.gallery[0]})` }}
          ></div>
          <h2>{this.props.product.name}</h2>
          <span className="priceTag">{this.findPrice()}</span>
        </Link>
        <div
          className={
            this.state.isHovered && this.props.product.inStock
              ? "attributeHover"
              : "displayNone"
          }
        >
          {this.props.product.attributes.map((attrSet) => {
            return (
              <div
                key={attrSet.id}
                className={`attributeGroup miniCartAttr ${
                  this.isButtonDisabled && "borderRed"
                }`}
              >
                {generateAttributes(
                  attrSet,
                  this.onChangeAttr,
                  this.props.product.id
                )}
              </div>
            );
          })}
        </div>

        <div
          className={
            this.state.isHovered && this.props.product.inStock
              ? "miniShoppingCart"
              : "displayNone"
          }
        >
          <div className="addToCartHover button">
            <img
              onClick={() => {
                if (!this.state.attributes.every((attr) => attr.value)) {
                  this.setState({ isButtonDisabled: true });
                  return;
                } else {
                  this.setState({ isButtonDisabled: false });
                  onAddToCart(this.props.product, this.state.attributes);
                }
              }}
              src={cart}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currency: state.currency, cart: state.cart };
}

export default connect(mapStateToProps)(SingleItem);
