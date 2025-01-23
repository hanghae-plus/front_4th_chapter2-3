import { DynamicIcon } from "lucide-react/dynamic";
import { forwardRef } from "react";
import { useControllableState, usePreservedCallback } from "../hooks";
import Input from "./Input";
import * as styles from "./Search.styles";

interface Props {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  setValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

const Search = (
  { placeholder, defaultValue = "", value: _value, setValueChange, onSearch }: Props,
  ref: React.ComponentPropsWithRef<"input">["ref"],
) => {
  const [value = "", setValue] = useControllableState({
    prop: _value,
    defaultProp: defaultValue,
    onChange: setValueChange,
  });

  const handleSearch = usePreservedCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(value);
    }
  });

  return (
    <div className={styles.container()}>
      <DynamicIcon name="search" className={styles.icon()} />
      <Input
        ref={ref}
        className={styles.input()}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default forwardRef(Search);
