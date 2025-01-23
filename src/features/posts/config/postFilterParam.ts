export const enum POST_FILTER_PARAM {
  SKIP = "skip",
  LIMIT = "limit",
  SEARCH = "search",
  TAG = "tag",
  SORT_BY = "sortBy",
  ORDER = "sortOrder",
}

export const DEFAULT_PARAM = {
  [POST_FILTER_PARAM.SKIP]: 0,
  [POST_FILTER_PARAM.LIMIT]: 10,
  [POST_FILTER_PARAM.SEARCH]: "",
  [POST_FILTER_PARAM.TAG]: "",
  [POST_FILTER_PARAM.SORT_BY]: "id",
  [POST_FILTER_PARAM.ORDER]: "asc",
};
