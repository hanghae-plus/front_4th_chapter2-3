import { Fragment } from "react/jsx-runtime";
import useOverlayGroupStore from "../store/useOverlayGroupStore";

function OverlayGroup() {
  const group = useOverlayGroupStore((state) => state.group);

  if (group.size === 0) return null;

  return (
    <>
      {[...group.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </>
  );
}

export default OverlayGroup;
