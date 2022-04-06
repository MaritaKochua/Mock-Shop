import { useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const params = useParams();

    return <Component params={params} {...props} />;
  };

  return Wrapper;
};

export default withRouter;
