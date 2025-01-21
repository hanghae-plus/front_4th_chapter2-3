import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { newPostsAtom, postsAtom, selectedPostsAtom } from "../model/store.ts"
import { showAddDialogAtom, showEditDialogAtom, showPostDetailDialogAtom } from "../../../entities/modal/model/store.ts"
import { addingPostApi, deletingPostApi, updatingPostApi } from "../../../entities/posts/api/fetchPosts.ts"
import { searchQueryAtom } from "../../search/model/store.ts"
import { selectedTagAtom } from "../../tag/model/store.ts"

export default function usePostData() {
  const [posts, setPosts] = useAtom(postsAtom);
  const setShowAddDialog = useSetAtom(showAddDialogAtom);
  const [newPost, setNewPost] = useAtom(newPostsAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostsAtom);
  const setShowEditDialog = useSetAtom(showEditDialogAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const setShowPostDetailDialog = useSetAtom(showPostDetailDialogAtom);
  
  const addPost = async () => {
    try {
      const data = await addingPostApi(newPost)
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }
  
  const updatePost = async () => {
    try {
      const data = await updatingPostApi(selectedPost);
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }
  
  const deletePost = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      await deletingPostApi(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }
  
  // 게시물 상세 보기
  const openPostDetail = (post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }
  
  return {
    addPost,
    updatePost,
    deletePost,
    posts,
    searchQuery,
    selectedTag,
    setSelectedTag,
    setSelectedPost,
    setShowEditDialog,
    openPostDetail,
  }
}