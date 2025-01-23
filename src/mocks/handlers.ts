import { commentsApis, postsApis, usersApis } from "./api";

export const handlers = [...postsApis, ...usersApis, ...commentsApis];
