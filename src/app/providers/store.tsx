import { StoreProvider } from "./provider";

type Props = {
  children?: React.ReactElement;
};

export const withStore = (Component: React.ComponentType<Props>) => {
  return function WithStoreProvider(props: Props) {
    return (
      <StoreProvider>
        <Component {...props} />
      </StoreProvider>
    );
  };
};