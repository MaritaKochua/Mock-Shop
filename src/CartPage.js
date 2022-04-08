import React from 'react'
import { connect } from 'react-redux'
import GenerateCartItems from './common/GenerateCartItems'
import PropTypes from 'prop-types'

class CartPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.findPrice = this.findPrice.bind(this)
  }

  findPrice (prices) {
    const currency = prices.find(
      (prod) => prod.currency.label === this.props.currency
    )
    return currency.currency.symbol + currency.amount
  }

  render () {
    return (
      <div className="pageContainer cartPage">
        <h1>CART</h1>
        {
          <GenerateCartItems
            cart={this.props.cart}
            findPrice={this.findPrice}
            photoCarousel={true}
          />
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { currency: state.currency, cart: state.cart }
}
CartPage.propTypes = {
  currency: PropTypes.string,
  cart: PropTypes.array
}
export default connect(mapStateToProps)(CartPage)
