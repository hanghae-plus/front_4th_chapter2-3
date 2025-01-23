import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { DialogContentProps, DialogTitleProps } from "@radix-ui/react-dialog";
import { DynamicIcon } from "lucide-react/dynamic";
import { forwardRef } from "react";
import * as styles from "./Dialog.styles";

const Dialog = DialogPrimitive.Root;

/** -----------------------------------------------------------------------------------------------
 * Sub Components
 * --------------------------------------------------------------------------------------------- */

const Trigger = DialogPrimitive.Trigger;

/* --------------------------------------------------------------------------------------------- */

const Content = forwardRef(
  (
    { className, children, ...rest }: DialogContentProps,
    ref: React.ComponentPropsWithRef<typeof DialogPrimitive.Content>["ref"],
  ) => {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.overlay()} />
        <DialogPrimitive.Content
          {...rest}
          ref={ref}
          className={styles.content({ className })}
          aria-describedby={undefined}
        >
          {children}
          <DialogPrimitive.Close>
            <DynamicIcon name="x" size="16px" />
            <span className="sr-only">닫기</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);

/* --------------------------------------------------------------------------------------------- */

const Header = forwardRef(
  (
    { className, ...rest }: React.ComponentPropsWithoutRef<"div">,
    ref: React.ComponentPropsWithRef<"div">["ref"],
  ) => {
    return <div {...rest} ref={ref} className={styles.header({ className })} />;
  },
);

/* --------------------------------------------------------------------------------------------- */

const Title = forwardRef(
  (
    { className, ...rest }: DialogTitleProps,
    ref: React.ComponentPropsWithRef<typeof DialogPrimitive.Title>["ref"],
  ) => {
    return <DialogPrimitive.Title {...rest} ref={ref} className={styles.title({ className })} />;
  },
);

/* --------------------------------------------------------------------------------------------- */

export default Object.assign(Dialog, {
  Trigger,
  Content,
  Header,
  Title,
});
