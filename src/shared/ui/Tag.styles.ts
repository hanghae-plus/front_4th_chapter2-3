import { cva } from "class-variance-authority";

export const tag = cva("cursor-pointer rounded-[4px] px-1 text-[9px] font-semibold", {
  variants: {
    active: {
      true: "bg-blue-500 text-white hover:bg-blue-600",
      false: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    },
  },
});
