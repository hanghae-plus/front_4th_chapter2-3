import { BrowserRouter } from "react-router-dom";

type Props = {
  children?: React.ReactElement;
};

export const withRouter = (Component: React.ComponentType<Props>) => {
  return function WithRouterProvider(props: Props) {
    return (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    );
  };
};