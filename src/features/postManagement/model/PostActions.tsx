import { PostFormState, Post, User, PostFilters, PaginationParams } from "../../../entities/types";
import { usePostContext } from "./PostContext";
import { postApi } from "../../../entities/post/api/postApi";
import { userApi } from "../../../entities/user/api/userApi";

export const usePostActions = () => {
  const { state, dispatch } = usePostContext();

  const fetchPosts = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const params: PostFilters & PaginationParams = {
        skip: state.skip,
        limit: state.limit,
        search: state.searchQuery,
        tag: state.selectedTag,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder
      };

      const [postsResponse, usersResponse] = await Promise.all([
        postApi.getPosts(params),
        userApi.getUsers({ limit: 0, select: 'username,image' })
      ]);

      const postsWithUsers = postsResponse.posts.map((post: Post) => ({
        ...post,
        author: usersResponse.users.find((user: User) => user.id === post.userId)
      }));

      dispatch({ type: "SET_POSTS", payload: postsWithUsers });
      dispatch({ type: "SET_TOTAL", payload: postsResponse.total });
    } catch (error) {
      console.error("게시물 가져오기 오류:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const addPost = async (newPost: PostFormState) => {
    try {
      const data: Post = await postApi.createPost(newPost);
      
      dispatch({ 
        type: "SET_POSTS", 
        payload: [data, ...state.posts] 
      });
      
      return data;
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };

  const updatePost = async (post: PostFormState & { id: number }) => {
    try {
      const updatedPost: Post = await postApi.updatePost(post.id, post);
      
      dispatch({ 
        type: "SET_POSTS", 
        payload: state.posts.map(p => p.id === updatedPost.id ? updatedPost : p)
      });
      
      return updatedPost;
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      await postApi.deletePost(id);
      
      dispatch({ 
        type: "SET_POSTS", 
        payload: state.posts.filter(p => p.id !== id)
      });
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  const fetchComments = async (postId: number) => {
    try {
      const comments = await postApi.getPostWithComments(postId);
      
      dispatch({ 
        type: "SET_COMMENTS", 
        payload: comments.comments 
      });
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  const getPostById = async (id: number): Promise<Post | null> => {
    try {
      const post = await postApi.getPostById(id);
      return post;
    } catch (error) {
      console.error("게시물 불러오기 오류:", error);
      return null;
    }
  };

  return {
    fetchPosts,
    addPost,
    updatePost,
    deletePost,
    fetchComments,
    getPostById
  };
};