import { atom, useAtom, useSetAtom } from "jotai";
import { Post, PostItem } from "../../../entities/post";
import { fetchPostsList } from "../../../entities/post/api/postApi";
import { fetchUsersList } from "../../../entities/user/api/userApi";
import { User } from "../../../entities/user";

const postsAtom = atom<Post>({ posts: [], total: 0, skip: 0, limit: 0 });
const usersAtom = atom<User[]>([]);
const loadingAtom = atom<boolean>(false);
const total = atom(0);

export const usePostList = async() => {
	const [postList, setPostList] = useAtom(postsAtom);
	const setUserList = useSetAtom(usersAtom);
	const setLoading = useSetAtom(loadingAtom);
	const setTotal = useSetAtom(total);
	
	try {
		setLoading(true);
		const postsList = await fetchPostsList(postList.limit, postList.skip);
		const userList = await fetchUsersList();

		setUserList(userList);

		const postsWithUserId = postsList.posts.map((post: PostItem) => {
			const findAuthor = userList.find((user: User) => user.id === post.author.id);
			if (!findAuthor) return post;
			return { ...post, author: findAuthor };
		});

		setPostList({ ...postList, posts: postsWithUserId });
		setTotal(postList.total);
	} catch (error) {
		console.error("게시물 가져오기 오류:", error)
	} finally {	
		setLoading(false);
	}

}