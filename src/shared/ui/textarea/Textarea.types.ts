import { TextareaHTMLAttributes } from "react";
import { textareaStyles } from "./Textarea.styles";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  base?: keyof typeof textareaStyles;
  className?: string;
}