import { forwardRef } from "react";
import { useControllableState } from "../hooks/useControllableState";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  defaultPressed?: boolean;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children: React.ReactNode;
}

const Toggle = (
  { defaultPressed = false, pressed: _pressed, onPressedChange, onClick, ...rest }: Props,
  ref: React.ComponentPropsWithRef<"button">["ref"],
) => {
  const [pressed = false, setPressed] = useControllableState({
    prop: _pressed,
    defaultProp: defaultPressed,
    onChange: onPressedChange,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    setPressed(!pressed);
  };

  return (
    <button
      {...rest}
      ref={ref}
      aria-pressed={pressed}
      data-state={pressed ? "on" : "off"}
      onClick={handleClick}
    />
  );
};

export default forwardRef(Toggle);
