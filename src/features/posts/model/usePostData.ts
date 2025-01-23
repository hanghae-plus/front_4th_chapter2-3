import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { newPostsAtom, selectedPostsAtom } from "./postsStore.ts"
import {
  showAddDialogAtom,
  showEditDialogAtom,
  showPostDetailDialogAtom,
  showUserModalAtom,
} from "../../../entities/modal/model/modalOpenerStore.ts"
import { addingPostApi, deletingPostApi, updatingPostApi } from "../../../entities/posts/api/postsApi.ts"
import { searchQueryAtom } from "../../search/model/searchQueryStore.ts"
import { selectedTagAtom } from "../../tag/model/tagStores.ts"
import useComments from "../../comments/model/useComments.ts"
import { InfPost } from "../../../entities/posts/types/types.ts"
import usePosts from "./usePostsQuery.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useURLParams } from "../../../shared/hooks/useURLParams.ts"
import { InfUser } from "../../../entities/user/model/userTypes.ts"
import { getUserById } from "../../../entities/user/api/usersApi.ts"
import { selectedUserAtom } from "../../users/model/usersStore.ts"

export default function usePostData() {
  const setShowAddDialog = useSetAtom(showAddDialogAtom);
  const setNewPost = useSetAtom(newPostsAtom);
  const setSelectedPost = useSetAtom(selectedPostsAtom);
  const setShowEditDialog = useSetAtom(showEditDialogAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const setShowPostDetailDialog = useSetAtom(showPostDetailDialogAtom);
  const setSelectedUser = useSetAtom(selectedUserAtom);
  const setShowUserModal = useSetAtom(showUserModalAtom);
  const {fetchComments} = useComments();
  const queryClient = useQueryClient();
  const {params} = useURLParams();
  
  const {posts} = usePosts();
  
  // Add Post Mutation
  const addPostMutation = useMutation({
    mutationFn: (newPost) => addingPostApi(newPost),
    onSuccess: (data) => {
      // 캐시 업데이트
      queryClient.setQueryData(['posts', params], (oldData) => ({
        ...oldData,
        posts: [data, ...(oldData?.posts || [])],
      }));
      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error);
    }
  });
  
  // Update Post Mutation
  const updatePostMutation = useMutation({
    mutationFn: (post) => updatingPostApi(post),
    onSuccess: (data) => {
      // 캐시 업데이트
      queryClient.setQueryData(['posts', params], (oldData) => ({
        ...oldData,
        posts: oldData.posts.map((post) => (post.id === data.id ? data : post)),
      }));
      setShowEditDialog(false);
    },
    onError: (error) => {
      console.error("게시물 업데이트 오류:", error);
    }
  });
  
  // Delete Post Mutation
  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      return deletingPostApi(id);
    },
    onSuccess: (_, deletedId) => {
      // 캐시 업데이트
      queryClient.setQueryData(['posts', params], (oldData) => ({
        ...oldData,
        posts: oldData.posts.filter((post) => post.id !== deletedId),
      }));
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error);
    }
  });
  
  // 좋아요 누르기, 싫어요 누르기
  const handleThumbs = useMutation({
    mutationFn: () => Promise.resolve(),
    onMutate: (data) => {
      queryClient.setQueryData(['posts', params], (oldData) => {
        const thisPost = oldData.posts.find(post => post.id === data.post.id);
        if (data.type === "up") {
          thisPost.reactions.likes += 1;
        } else {
          thisPost.reactions.dislikes += 1;
        }
        return oldData;
      });
    }
  });
  
  // 게시물 상세 보기
  const openPostDetail = async (post : InfPost) => {
    setSelectedPost(post)
    await fetchComments(post.id)
    setShowPostDetailDialog(true)
  }
  
  // 사용자 모달 열기
  const openUserModal = async (user : InfUser)  => {
    try {
      const userData = await getUserById(user);
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }
  
  return {
    addPost: (post) => addPostMutation.mutate(post),
    updatePost: (post) => updatePostMutation.mutate(post),
    deletePost: (id) => deletePostMutation.mutate(id),
    posts,
    searchQuery,
    selectedTag,
    setSelectedTag,
    setSelectedPost,
    setShowEditDialog,
    openPostDetail,
    openUserModal,
    handleThumbs: (post, type) => handleThumbs.mutate({post, type})
  }
}