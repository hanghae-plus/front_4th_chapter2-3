import { HTMLAttributes } from "react";
import { cardStyles } from "./Card.styles";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  card?: keyof typeof cardStyles;
  className?: string;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  header?: keyof typeof cardStyles;
  className?: string;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}