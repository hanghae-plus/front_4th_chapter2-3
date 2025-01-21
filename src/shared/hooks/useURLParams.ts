import { useAtom } from "jotai"
import { searchParamsAtom, SearchParamsProps } from "../../entities/search/model/stores.ts"

export const useURLParams = () => {
  const [params, setParams] = useAtom(searchParamsAtom);
  
  const updateParams = (newParams: any) => {
    setParams((prev) => ({
      ...prev,
      ...newParams
    }));
  };
  
  // 주소값 초기화
  const initParams = (newParams : SearchParamsProps) => {
    setParams(newParams);
  }
  
  return {
    params,
    updateParams,
    initParams
  };
};