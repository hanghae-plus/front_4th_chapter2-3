import { forwardRef } from "react";
import * as styles from "./Card.styles";

const Card = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"div">,
    ref: React.ComponentPropsWithRef<"div">["ref"],
  ) => {
    return <div {...rest} ref={ref} className={styles.card({ className })} />;
  },
);

/** -----------------------------------------------------------------------------------------------
 * Sub Components
 * --------------------------------------------------------------------------------------------- */

const Header = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"div">,
    ref: React.ComponentPropsWithRef<"div">["ref"],
  ) => {
    return <div {...rest} ref={ref} className={styles.header({ className })} />;
  },
);

/* --------------------------------------------------------------------------------------------- */

const Content = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"div">,
    ref: React.ComponentPropsWithRef<"div">["ref"],
  ) => {
    return <div {...rest} ref={ref} className={styles.content({ className })} />;
  },
);

/* --------------------------------------------------------------------------------------------- */

const Title = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"h3">,
    ref: React.ComponentPropsWithRef<"h3">["ref"],
  ) => {
    return <h3 {...rest} ref={ref} className={styles.title({ className })} />;
  },
);

/* --------------------------------------------------------------------------------------------- */

export default Object.assign(Card, {
  Header,
  Content,
  Title,
});
