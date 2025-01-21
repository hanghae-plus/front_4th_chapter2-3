import { useState } from 'react'
import { Post } from '../models/types'
import { PostListRes, UserListRes } from '../models/dto.types'
import { getPostList, getPostListBySearch, getPostListByTag } from '../service/post.service'
import { getUserList } from '../service/user.service'
import { useLimitParam, useSearchParam, useSkipParam } from './useQueryParams'

// IDEA tanstack query로 처리할 시 indalied key로 재요청 처리한다. 그럼 posts를 state로 관리하지 않아도 된다.
// posts는 서버의 상태이기에 서버 상태관리 라이브러리인 tanstack query를 사용해서 처리한다.
export const usePost = () => {
  const [searchQuery] = useSearchParam()
  const [skip] = useSkipParam()
  const [limit] = useLimitParam()

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const [postsData, usersData]: [PostListRes, UserListRes] = await Promise.all([
        getPostList(limit, skip),
        getUserList(),
      ])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error('게시물 가져오기 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const data: PostListRes = await getPostListBySearch(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error('게시물 검색 오류:', error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === 'all') {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsData, usersData]: [PostListRes, UserListRes] = await Promise.all([
        getPostListByTag(tag),
        getUserList(),
      ])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error('태그별 게시물 가져오기 오류:', error)
    }
    setLoading(false)
  }

  return { posts, loading, total, fetchPosts, searchPosts, fetchPostsByTag }
}
