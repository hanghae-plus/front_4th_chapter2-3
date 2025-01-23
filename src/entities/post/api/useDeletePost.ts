import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../shared/config/QueryKeys"
import { Post } from "../model/types"

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: Post["id"]) => {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST.all,
      })
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })
}
