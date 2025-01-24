import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postApi } from "../api/api"
import { usePostsFilter } from "./usePostFilter"
import { useDialogStore } from "../../../shared/model/useDialogStore"
import { usePostStore } from "./store"
import { useEffect, useState } from "react"

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: { limit: number; skip: number }) => [...postKeys.lists(), filters] as const,
}

export const usePostActions = () => {
  const [total, setTotal] = useState(0)
  const { skip, limit } = usePostsFilter()
  const { posts, setPosts, setNewPost } = usePostStore()
  const { setShowAddDialog, setShowEditDialog } = useDialogStore()

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: postKeys.list({ limit, skip }),
    queryFn: () => postApi.getPosts({ limit, skip }),
  })

  useEffect(() => {
    if (data) {
      setPosts(data.posts)
      setTotal(data.total)
    }
  }, [data])

  const addMutation = useMutation({
    mutationFn: postApi.addPost,
    onSuccess: (newPost) => {
      queryClient.invalidateQueries(postKeys.lists())
      setPosts((prev) => [newPost, ...prev])
      setNewPost({ title: "", body: "", userId: 1 })
      setShowAddDialog(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, post }) => postApi.updatePost(id, post),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries(postKeys.lists())
      setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
      setShowEditDialog(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries(postKeys.lists())
      setPosts((prev) => prev.filter((post) => post.id !== deletedId))
    },
  })

  return {
    isLoading,
    posts,
    total,
    addPost: addMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
  }
}
