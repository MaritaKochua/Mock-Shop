import { gql } from "@apollo/client";

const CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export default CURRENCIES;
