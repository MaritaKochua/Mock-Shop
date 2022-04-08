import { gql } from '@apollo/client'

export const CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`

export const PRODUCTS = gql`
  query category($category: String!) {
    category(input: { title: $category }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`
