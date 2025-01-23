import { Children, isValidElement } from "react";
import { parseTextWithKeywords } from "../lib";

interface Props {
  query: string[];
  children: React.ReactNode;
}

const Highlight = ({ query, children }: Props) => {
  return Children.map(children, (child) => {
    if (isValidElement(child) && isChildrenInProps(child.props)) {
      const {
        type: Child,
        props: { children: grandchildren, ...rest },
      } = child;

      return (
        <Child {...rest}>
          <Highlight query={query}>{grandchildren}</Highlight>
        </Child>
      );
    }

    if (typeof child === "string") {
      const chunks = parseTextWithKeywords(child, query);
      return chunks.map(({ value, matched }, i) =>
        matched ? <mark key={i}>{value}</mark> : value,
      );
    }

    return child;
  });
};

/** -----------------------------------------------------------------------------------------------
 * Utils
 * --------------------------------------------------------------------------------------------- */

const isChildrenInProps = <T,>(props: T): props is T & React.PropsWithChildren => {
  if (typeof props !== "object" || props === null) return false;

  return "children" in props;
};

export default Highlight;
