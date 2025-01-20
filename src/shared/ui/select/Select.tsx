import React from "react";
import { SelectProps } from "./Select.types";
import { Select as SelectPrimitive } from "@radix-ui/react-select";

export const Select: React.FC<SelectProps> = ({ children, ...props }) => (
  <SelectPrimitive {...props}>{children}</SelectPrimitive>
);