import { ComponentPropsWithoutRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

export interface Tag {
  slug: string;
  url: string;
}

export interface SelectProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  children: React.ReactNode;
}

export interface SelectTriggerProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  children: React.ReactNode;
  className?: string;
}

export interface SelectValueProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Value> {
  placeholder: string;
}

export interface SelectContentProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  children: React.ReactNode;
  className?: string;
}

export interface SelectItemProps extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  children: React.ReactNode;
  className?: string;
}