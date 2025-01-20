import { cva } from "class-variance-authority";

export const card = cva("bg-card text-card-foreground rounded-lg border shadow-sm");

export const header = cva("flex flex-col space-y-1.5 p-6");

export const content = cva("p-6 pt-0");

export const title = cva("text-2xl font-semibold leading-none tracking-tight");
