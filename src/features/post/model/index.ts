import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { getPostsWithUsers } from "@/features/post/lib"
import {
  addComment,
  addPost,
  deleteComment,
  deletePost,
  fetchCommentsByPostId,
  fetchTags,
  likeComment,
  searchPost,
  searchPostByTag,
  updateComment,
  updatePost,
} from "@entities/post/api"
import { Comment, Post, RequestComment, RequestPost, SearchParams } from "@entities/post/types"
import { useSearchParams } from "react-router-dom"

export const usePostsQuery = () => {
  const [searchParams] = useSearchParams()
  const skip = searchParams.get("skip") ?? "0"
  const limit = searchParams.get("limit") ?? "10"
  const searchQuery = searchParams.get("search") ?? ""
  const tag = searchParams.get("tag") ?? "all"
  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = searchParams.get("sortOrder") || "asc"

  const params: SearchParams = { skip, limit, searchQuery, tag, sortBy, sortOrder }

  return useSuspenseQuery({
    queryKey: ["/api/posts", params],
    queryFn: () => {
      return getPostsWithUsers(params)
    },
  })
}

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["/api/posts/tags"],
    queryFn: () => fetchTags(),
  })
}

export const useSearchPostsQuery = (searchQuery: string) => {
  return useQuery({
    queryKey: ["search"],
    queryFn: () => searchPost(searchQuery),
  })
}

export const useSearchPostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: ["search"],
    queryFn: () => searchPostByTag(tag),
  })
}

export const useAddPostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newPost: RequestPost) => addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/posts"],
        exact: true,
      })
    },
  })
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newPost: Post) => updatePost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/posts"],
        exact: true,
      })
    },
  })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/posts"],
        exact: true,
      })
    },
  })
}

export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: ["/api/comments/post"],
    queryFn: () => fetchCommentsByPostId(postId),
  })
}

export const useLikeCommentsMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: { likes: number } }) => likeComment(id, likes),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/comments/posts"],
        exact: true,
      })
    },
  })
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (comment: Comment) => updateComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/comments/posts"],
        exact: true,
      })
    },
  })
}

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (comment: RequestComment) => addComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/comments/posts"],
        exact: true,
      })
    },
  })
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/comments/posts"],
        exact: true,
      })
    },
  })
}
