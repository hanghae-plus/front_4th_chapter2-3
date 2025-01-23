import { useSearchParams } from "react-router-dom";

import { DEFAULT_PARAM, POST_FILTER_PARAM } from "../config";

export const usePostFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const skip = parseInt(searchParams.get(POST_FILTER_PARAM.SKIP) || DEFAULT_PARAM[POST_FILTER_PARAM.SKIP].toString());
  const limit = parseInt(
    searchParams.get(POST_FILTER_PARAM.LIMIT) || DEFAULT_PARAM[POST_FILTER_PARAM.LIMIT].toString(),
  );
  const searchQuery = searchParams.get(POST_FILTER_PARAM.SEARCH) || DEFAULT_PARAM[POST_FILTER_PARAM.SEARCH];
  const tag = searchParams.get(POST_FILTER_PARAM.TAG) || DEFAULT_PARAM[POST_FILTER_PARAM.TAG];
  const sortBy = searchParams.get(POST_FILTER_PARAM.SORT_BY) || DEFAULT_PARAM[POST_FILTER_PARAM.SORT_BY];
  const order = searchParams.get(POST_FILTER_PARAM.ORDER) || DEFAULT_PARAM[POST_FILTER_PARAM.ORDER];

  const changePostFilterParams = (key: POST_FILTER_PARAM, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return {
    params: {
      skip,
      limit,
      searchQuery,
      tag,
      sortBy,
      order,
    },
    changePostFilterParams,
  };
};
