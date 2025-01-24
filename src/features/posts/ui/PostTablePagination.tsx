import { Pagination } from "@/shared/ui";

import { POST_FILTER_PARAM } from "../config";
import { usePost, usePostFilter } from "../model";

export const PostTablePagination = () => {
  const { total } = usePost();
  const { params, changePostFilterParams } = usePostFilter();

  return (
    <Pagination
      skip={params.skip}
      limit={params.limit}
      total={total}
      onChangeLimit={(limit) => changePostFilterParams(POST_FILTER_PARAM.LIMIT, limit.toString())}
      onChangeSkip={(skip) => changePostFilterParams(POST_FILTER_PARAM.SKIP, skip.toString())}
    />
  );
};
