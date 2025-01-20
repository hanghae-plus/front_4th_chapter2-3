import { useState } from 'react'
import { NewPost, Post } from '../models/types'
import { PostListRes, UserListRes } from '../models/dto.types'
import {
  deletePost,
  getPostList,
  getPostListBySearch,
  getPostListByTag,
  postPost,
  putPost,
} from '../service/post.service'
import { getUserList } from '../service/user.service'

// IDEA tanstack query로 처리할 시 indalied key로 재요청 처리한다. 그럼 posts를 state로 관리하지 않아도 된다.
// posts는 서버의 상태이기에 서버 상태관리 라이브러리인 tanstack query를 사용해서 처리한다.
export const usePost = (limit: number, skip: number) => {
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
  const searchPosts = async (searchQuery: string) => {
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

  // 게시물 업데이트
  const updatePost = async (post: Post | null, onSuccess: () => void) => {
    try {
      if (!post) return
      const data: Post = await putPost(post)
      setPosts(posts.map((p) => (p.id === data.id ? data : p)))
      onSuccess()
    } catch (error) {
      console.error('게시물 업데이트 오류:', error)
    }
  }

  // 게시물 삭제
  const deletedPost = async (id: number) => {
    try {
      await deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error('게시물 삭제 오류:', error)
    }
  }

  const addPost = async (post: NewPost, onSuccess: () => void) => {
    try {
      const data: Post = await postPost(post)
      setPosts([data, ...posts])
      onSuccess()
    } catch (error) {
      console.error('게시물 추가 오류:', error)
    }
  }

  return { posts, loading, total, fetchPosts, searchPosts, fetchPostsByTag, updatePost, deletedPost, addPost }
}
