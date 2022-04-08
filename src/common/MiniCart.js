import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import GenerateCartItems from './GenerateCartItems'
import PropTypes from 'prop-types'

class MiniCart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.findPrice = this.findPrice.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
    this.calculateTotalItems = this.calculateTotalItems.bind(this)
  }

  findPrice (prices) {
    const currency = prices.find(
      (prod) => prod.currency.label === this.props.currency
    )
    return currency.currency.symbol + currency.amount
  }

  calculateTotal () {
    let prices = 0
    this.props.cart.forEach((item) => {
      const currency = item.prices.find(
        (prod) => prod.currency.label === this.props.currency
      )
      prices = Math.floor((prices + currency.amount * item.amount) * 100) / 100
    })
    return prices
  }

  calculateTotalItems () {
    let items = 0
    this.props.cart.map((item) => (items += item.amount))
    return items
  }

  render () {
    return (
      <div className="miniCartWindow">
        <h2>
          My Bag:
          {this.props.cart.length > 0 ? this.calculateTotalItems() : 0} items
        </h2>
        {this.props.cart.length > 0 && (
          <GenerateCartItems
            cart={this.props.cart}
            findPrice={this.findPrice}
          />
        )}
        <div className="cartTotalAmount">
          <p>Total</p>
          <p>{this.calculateTotal()}</p>
        </div>
        {/* buttons */}
        <div>
          <Link to={'/cart'}>
            <button className="viewBagButton cartBTN">VIEW BAG</button>
          </Link>
          <Link to={''}>
            <button className="checkoutButton cartBTN">CHECKOUT</button>
          </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { currency: state.currency, cart: state.cart }
}

MiniCart.propTypes = {
  cart: PropTypes.array,
  currency: PropTypes.string
}

export default connect(mapStateToProps)(MiniCart)
