import { forwardRef } from "react"
import * as styles from "./Textarea.styles"

type Props = React.ComponentPropsWithoutRef<"textarea">

const Textarea = forwardRef(
  ({ className, ...rest }: Props, ref: React.ComponentPropsWithRef<"textarea">["ref"]) => {
    return <textarea {...rest} ref={ref} className={styles.textarea({ className })} />
  },
)

export default Textarea
