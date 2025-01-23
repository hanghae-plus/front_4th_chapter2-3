import { forwardRef } from "react"
import * as styles from "./Table.styles"

const Table = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"table">,
    ref: React.ComponentPropsWithRef<"table">["ref"],
  ) => {
    return (
      <div className="w-full overflow-auto">
        <table {...rest} ref={ref} className={styles.table({ className })}></table>
      </div>
    )
  },
)

/** -----------------------------------------------------------------------------------------------
 * Sub Components
 * --------------------------------------------------------------------------------------------- */

const Header = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"thead">,
    ref: React.ComponentPropsWithRef<"thead">["ref"],
  ) => {
    return <thead {...rest} ref={ref} className={styles.thead({ className })} />
  },
)

/* --------------------------------------------------------------------------------------------- */

const Body = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"tbody">,
    ref: React.ComponentPropsWithRef<"tbody">["ref"],
  ) => {
    return <tbody {...rest} ref={ref} className={styles.tbody({ className })} />
  },
)

/* --------------------------------------------------------------------------------------------- */

const Row = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"tr">,
    ref: React.ComponentPropsWithRef<"tr">["ref"],
  ) => {
    return <tr {...rest} ref={ref} className={styles.tr({ className })} />
  },
)

/* --------------------------------------------------------------------------------------------- */

const Head = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"th">,
    ref: React.ComponentPropsWithRef<"th">["ref"],
  ) => {
    return <th {...rest} ref={ref} className={styles.th({ className })} />
  },
)

/* --------------------------------------------------------------------------------------------- */

const Cell = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"td">,
    ref: React.ComponentPropsWithRef<"td">["ref"],
  ) => {
    return <td {...rest} ref={ref} className={styles.td({ className })} />
  },
)

/* --------------------------------------------------------------------------------------------- */

export default Object.assign(Table, {
  Header,
  Body,
  Row,
  Head,
  Cell,
})
