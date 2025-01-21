import React from "react";
import { withRouter } from "./router";
import { withStore } from "./store";

type Props = {
  children?: React.ReactElement;
};

export const withProviders = (Component: React.ComponentType<Props>) => {
  return withRouter(withStore(Component));
};