import React from 'react'
import { client } from '.'
import { PRODUCTS } from './queries/categories'
import SingleItem from './common/SingleItem'
import withRouter from './utils/withRouter'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class MainContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      categoryName: null
    }
  }

  componentDidMount () {
    if (!this.props.params.category) {
      client
        .query({
          query: PRODUCTS,
          variables: { category: 'all' }
        })
        .then((res) => {
          const data = res.data.category
          this.setState({ data: data })
          this.setState({
            categoryName: 'All'
          })
        })
    } else {
      client
        .query({
          query: PRODUCTS,
          variables: { category: this.props.params.category }
        })
        .then((res) => {
          const data = res.data.category
          this.setState({ data: data })
          this.setState({
            categoryName:
              data.name.charAt(0).toUpperCase() + data.name.slice(1)
          })
        })
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.params !== prevProps.params) {
      if (!this.props.params.category) {
        client
          .query({
            query: PRODUCTS,
            variables: { category: 'all' }
          })
          .then((res) => {
            const data = res.data.category
            this.setState({ data: data })
            this.setState({
              categoryName: 'All'
            })
          })
      } else {
        client
          .query({
            query: PRODUCTS,
            variables: { category: this.props.params.category }
          })
          .then((res) => {
            const data = res.data.category
            this.setState({ data: data })
            this.setState({
              categoryName:
                data.name.charAt(0).toUpperCase() + data.name.slice(1)
            })
          })
      }
    }
  }

  render () {
    return (
      <div className="pageContainer">
        <h1>{this.state.categoryName}</h1>
        <div className="categoryGrid">
          {this.state.data !== undefined &&
            this.state.data.products?.map((product) => {
              return <SingleItem product={product} key={product.id} />
            })}
        </div>
      </div>
    )
  }
}
MainContainer.propTypes = {
  params: PropTypes.any
}

export default connect()(withRouter(MainContainer))
