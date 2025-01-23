import { forwardRef } from "react"
import * as styles from "./Input.styles"

type Props = React.ComponentPropsWithRef<"input">

const Input = forwardRef(
  ({ className, ...rest }: Props, ref: React.ComponentPropsWithRef<"input">["ref"]) => {
    return <input {...rest} ref={ref} className={styles.input({ className })} />
  },
)

export default Input
