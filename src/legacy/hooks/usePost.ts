import { useLimitParam, useSearchParam, useSkipParam, useTagParam } from './useQueryParams'
import { useGetPostList, useGetPostListBySearch, useGetPostListByTag } from '../queries/post.query'
import { useGetUserList } from '../queries/user.query'
import { attachUsersToPost } from '../utils/attachUsersToPost'

// IDEA tanstack query로 처리할 시 indalied key로 재요청 처리한다. 그럼 posts를 state로 관리하지 않아도 된다.
// posts는 서버의 상태이기에 서버 상태관리 라이브러리인 tanstack query를 사용해서 처리한다.
export const usePost = () => {
  const [searchQuery] = useSearchParam()
  const [skip] = useSkipParam()
  const [limit] = useLimitParam()
  const [selectedTag] = useTagParam()

  const { data: users } = useGetUserList()
  const { data: postList, isFetching: isPostListFetching } = useGetPostList(limit, skip)
  const { data: postListByTag, isFetching: isPostListByTagFetching } = useGetPostListByTag(selectedTag)
  const { data: postListBySearch, isFetching: isSearchFetching } = useGetPostListBySearch(searchQuery)

  const posts = selectedTag && selectedTag !== 'all' ? postListByTag : searchQuery ? postListBySearch : postList
  const loading = isPostListFetching || isPostListByTagFetching || isSearchFetching

  return {
    posts: attachUsersToPost(posts?.posts || [], users?.users || []),
    loading,
    total: postList?.total || 0,
  }
}
