import React from 'react'
import { generateAttributes } from '../utils/generateAttributes'
import store, { addToCart, removeFromCart } from '../redux/store'
import PropTypes from 'prop-types'

// (cart, pricesFunc, multipleImages = false)
class GenerateCartItems extends React.Component {
  constructor (props) {
    super(props)
    this.state = { activePhotoIndex: {} }
    this.calculateCurrentPhoto = this.calculateCurrentPhoto.bind(this)
  }

  componentDidMount () {
    const photoCarouselId = {}
    this.props.cart.map((prod) => (photoCarouselId[prod.uniqueId] = 0))
    this.setState({ activePhotoIndex: photoCarouselId })
  }

  calculateCurrentPhoto (photos, action, id) {
    if (action === 'prev' && this.state.activePhotoIndex[id] > 0) {
      this.setState({
        activePhotoIndex: {
          ...this.state.activePhotoIndex,
          [id]: this.state.activePhotoIndex[id] - 1
        }
      })
    } else if (
      action === 'next' &&
      this.state.activePhotoIndex[id] < photos.length - 1
    ) {
      this.setState({
        activePhotoIndex: {
          ...this.state.activePhotoIndex,
          [id]: this.state.activePhotoIndex[id] + 1
        }
      })
    }
  }

  render () {
    console.log(this.state.activePhotoIndex)
    return this.props.cart.map((item) => {
      return (
        <div key={item.id} className="cartMiniItem ">
          <div className="divColumn">
            <p>{item.brand}</p>
            <p>{item.name}</p>
            <span className="priceTagMini">
              {this.props.findPrice(item.prices)}
            </span>
            {/* attributes */}
            {item.attributes.map((attrSet) => {
              return (
                <div key={attrSet.id} className="attributeGroup miniCartAttr">
                  <h2>{attrSet.name}</h2>
                  {generateAttributes(attrSet, null, item.uniqueId)}
                </div>
              )
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
            {this.props.photoCarousel
              ? (
              <div
                className="divColumn cartItemPhoto"
                style={{
                  backgroundImage: `url(${
                    item.gallery[this.state.activePhotoIndex[item.uniqueId]]
                  })`
                }}
              >
                <b
                  className="cartCarouselIcons"
                  onClick={() =>
                    this.calculateCurrentPhoto(
                      item.gallery,
                      'prev',
                      item.uniqueId
                    )
                  }
                >{'<'}</b>
                <b
                  className="cartCarouselIcons"
                  onClick={() =>
                    this.calculateCurrentPhoto(
                      item.gallery,
                      'next',
                      item.uniqueId
                    )
                  }
                >{'>'}</b>
              </div>
                )
              : (
              <div
                className="divColumn cartItemPhoto"
                style={{ backgroundImage: `url(${item.gallery[0]})` }}
              ></div>
                )}
          </div>
        </div>
      )
    })
  }
}

GenerateCartItems.propTypes = {
  cart: PropTypes.array,
  findPrice: PropTypes.func,
  photoCarousel: PropTypes.bool
}

export default GenerateCartItems
