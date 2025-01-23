import { useControllableState } from "../hooks/useControllableState";
import * as styles from "./Tag.styles";
import Toggle from "./Toggle";

interface Props {
  defaultActive?: boolean;
  active?: boolean;
  onActiveChange?: (active: boolean) => void;
  children: React.ReactNode;
}

const Tag = ({ defaultActive = false, active: _active, onActiveChange, children }: Props) => {
  const [active = false, setActive] = useControllableState({
    prop: _active,
    defaultProp: defaultActive,
    onChange: onActiveChange,
  });

  return (
    <Toggle className={styles.tag({ active })} pressed={active} onPressedChange={setActive}>
      {children}
    </Toggle>
  );
};

export default Tag;
