import { useCallback, useEffect, useRef, useState } from "react";
import { usePreservedCallback } from "./usePreservedCallback";

interface UseControllableStateParams<T> {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
}

type SetStateFn<T> = (prev?: T) => T;

export const useControllableState = <T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>) => {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const handleChange = usePreservedCallback(onChange);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const value = typeof nextValue === "function" ? setter(prop) : nextValue;

        if (value !== prop) {
          handleChange(value as T);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [prop, isControlled, setUncontrolledProp, handleChange],
  );

  return [value, setValue] as const;
};

const useUncontrolledState = <T>({
  defaultProp,
  onChange: _onChange,
}: Omit<UseControllableStateParams<T>, "prop">) => {
  const uncontrolledState = useState<T | undefined>(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = useRef(value);
  const onChange = usePreservedCallback(_onChange);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      onChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, onChange]);

  return uncontrolledState;
};
