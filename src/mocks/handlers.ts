import { commentsApis, postsApis } from "./api";

export const handlers = [...commentsApis, ...postsApis];
