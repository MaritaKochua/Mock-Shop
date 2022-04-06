import React from "react";
import { client } from ".";
import CATEGORIES from "./queries/categories";
import SingleItem from "./common/SingleItem";
import withRouter from "./utils/withRouter";
import { connect } from "react-redux";

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      categoryName: null,
    };
  }

  componentDidMount = () => {
    client.query({ query: CATEGORIES }).then((res) => {
      const data = res.data.categories;
      if (!this.props.params.category) {
        this.setState({ data: data[0] });
        this.setState({
          categoryName: "All",
        });
      } else {
        const categoryIndex = data.findIndex(
          (ct) => ct.name === this.props.params.category
        );
        this.setState({ data: data[categoryIndex] });
        this.setState({
          categoryName:
            data[categoryIndex]?.name.charAt(0).toUpperCase() +
            data[categoryIndex]?.name.slice(1),
        });
      }
    });
  };
  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      client.query({ query: CATEGORIES }).then((res) => {
        const data = res.data.categories;
        if (!this.props.params.category) {
          this.setState({ data: data[0] });
          this.setState({
            categoryName: "All",
          });
        } else {
          const categoryIndex = data.findIndex(
            (ct) => ct.name === this.props.params.category
          );
          this.setState({ data: data[categoryIndex] });
          this.setState({
            categoryName:
              data[categoryIndex]?.name.charAt(0).toUpperCase() +
              data[categoryIndex]?.name.slice(1),
          });
        }
      });
    }
  }
  render() {
    return (
      <div className="pageContainer">
        <h1>{this.state.categoryName}</h1>
        <div className="categoryGrid">
          {this.state.data !== undefined &&
            this.state.data.products?.map((product) => {
              return <SingleItem product={product} key={product.id} />;
            })}
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(MainContainer));
