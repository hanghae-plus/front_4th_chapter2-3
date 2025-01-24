import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchTags } from "../api/fetchTags";

export const useTags = () => {
  return useSuspenseQuery({ queryKey: ["tags"], queryFn: fetchTags });
};
