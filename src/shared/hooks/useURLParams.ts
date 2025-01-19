import { useAtom } from "jotai"
import { searchParamsAtom } from "../../entities/search/model/stores.ts"
import { useCallback } from "react"

export const useURLParams = () => {
  const [params, setParams] = useAtom(searchParamsAtom);
  
  const updateParams = useCallback((newParams: any) => {
    setParams((prev) => ({
      ...prev,
      ...newParams
    }));
  }, [setParams]);
  
  return {
    params,
    updateParams
  };
};