import { addPost } from "@/entities/post/api"
import { addPosts, PostInput, PostList } from "@/entities/post/model"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useMutationPostAdd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postInput: PostInput) => addPost(postInput),
    onMutate(postInput) {
      queryClient.setQueriesData<PostList>(
        { queryKey: ["posts"] }, //
        (postList) => addPosts(postList, postInput),
      )
      return { postInput }
    },
    onSuccess() {
      // 낙관적 업데이트 후 캐시 무효화
      // queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError(error) {
      console.error("게시물 추가 오류:", error)
    },
  })
}
