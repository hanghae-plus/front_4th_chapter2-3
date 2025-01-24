import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@shared/button/config/variants.ts";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}
