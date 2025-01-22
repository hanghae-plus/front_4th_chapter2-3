import { useLocation } from "react-router-dom";

export const useQueryParams = (queryTarget: string) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return queryParams.get(queryTarget) || "";
};
