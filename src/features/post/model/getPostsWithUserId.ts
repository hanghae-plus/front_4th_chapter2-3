import { Post, PostItem } from "../../../entities/post";
import { UserInfoType, UserType } from "../../../entities/user/model/types";

interface postWithUserProps {
  postsList: Post;
  userList: UserType;
}

export const getPostsWithUserId = ({ postsList, userList }: postWithUserProps) => {
  postsList.posts.map((post: PostItem) => {
    const findAuthor = userList.users.find((user: UserInfoType) => user.id === post.userId);
    if (!findAuthor) return post;
    return { ...post, findAuthor };
  });
}