import { VariantProps } from "class-variance-authority"
import { forwardRef } from "react"
import * as styles from "./Button.styles"

type Props = React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof styles.button>

const Button = forwardRef(
  (
    { className, variant, size, ...rest }: Props,
    ref: React.ComponentPropsWithRef<"button">["ref"],
  ) => {
    return <button {...rest} ref={ref} className={styles.button({ variant, size, className })} />
  },
)

export default Button
