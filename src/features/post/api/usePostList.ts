import { atom, useSetAtom } from "jotai";
import { Post, PostItem } from "../../../entities/post";
import { fetchPostsList } from "../../../entities/post/api/postApi";
import { fetchUsersList } from "../../../entities/user/api/userApi";
import { UserInfoType, UserType } from "../../../entities/user/model/types";

const postsAtom = atom<Post>({ posts: [], total: 0, skip: 0, limit: 0 });
const usersAtom = atom<UserType>({ users: [], total: 0, skip: 0, limit: 0 });
const loadingAtom = atom<boolean>(false);
const totalAtom = atom<number>(0);

export const usePostList = (skip: number, limit: number) => {
	const setPostList = useSetAtom(postsAtom);
	const setUserList = useSetAtom(usersAtom);
	const setLoading = useSetAtom(loadingAtom);
	const setTotal = useSetAtom(totalAtom);

	return async () => {
		try {
			setLoading(true);
			const postsList = await fetchPostsList(limit, skip);
			const userList = await fetchUsersList();
			
			const postsWithUserId = postsList.posts.map((post: PostItem) => {
				const findAuthor = userList.users.find((user: UserInfoType) => user.id === post.userId);
				if (!findAuthor) return post;
				return { ...post, findAuthor };
			});
			
			setUserList(userList);
			setPostList({ ...postsList, posts: postsWithUserId });
			setTotal(postsList.total);
		} catch (error) {
			console.error("게시물 가져오기 오류:", error)
		} finally {	
			setLoading(false);
		}
	};
}
