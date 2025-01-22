import { 
    UserResponse,
    Post,
    PostsResponse
} from "../model/types"
import { useState } from "react"
import { useLocation } from "react-router-dom"

export const usePost = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
    const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
    const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
    const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

    const [selectedPost, setSelectedPost] = useState<Post | null>(null)
    const [posts, setPosts] = useState<Post[]>([])
    const [total, setTotal] = useState(0)
    
    const [loading, setLoading] = useState(false)
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)

    // 게시물 가져오기
    const fetchPosts = async () => {
        setLoading(true)
        let postsData: PostsResponse
        let usersData: UserResponse[]
    
        try {
            const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
            postsData = await response.json()
        
            const usersResponse = await fetch("/api/users?limit=0&select=username,image")
            const users = await usersResponse.json()
            usersData = users.users
        
            const postsWithUsers: Post[] = postsData.posts.map((post) => ({
                ...post,
                author: usersData.find((user) => user.id === post.userId),
            }))
    
            setPosts(postsWithUsers)
            setTotal(postsData.total)
        } catch (error) {
            console.error("게시물 가져오기 오류:", error)
        } finally {
            setLoading(false)
        }
    }

    // 게시물 추가
    const addPost = async () => {
        try {
            const response = await fetch("/api/posts/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            })
            const data = await response.json()
            setPosts([data, ...posts])
            setShowAddDialog(false)
            setNewPost({ title: "", body: "", userId: 1 })
        } catch (error) {
            console.error("게시물 추가 오류:", error)
        }
    }

    // 게시물 업데이트
    const updatePost = async () => {
        try {
            const response = await fetch(`/api/posts/${selectedPost!.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedPost),
            })
            const data = await response.json()
            setPosts(posts.map((post) => (post.id === data.id ? data : post)))
            setShowEditDialog(false)
        } catch (error) {
            console.error("게시물 업데이트 오류:", error)
        }
    }

    // 게시물 삭제
    const deletePost = async (id: number) => {
        try {
            await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            })
            setPosts(posts.filter((post) => post.id !== id))
        } catch (error) {
            console.error("게시물 삭제 오류:", error)
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
            const response = await fetch(`/api/posts/search?q=${searchQuery}`)
            const data = await response.json()
            setPosts(data.posts)
            setTotal(data.total)
        } catch (error) {
            console.error("게시물 검색 오류:", error)
        }
        setLoading(false)
    }

    // 태그별 게시물 가져오기
    const fetchPostsByTag = async (tag: string) => {
        if (!tag || tag === "all") {
        fetchPosts()
        return
        }
        setLoading(true)
        try {
        const [postsResponse, usersResponse] = await Promise.all([
            fetch(`/api/posts/tag/${tag}`),
            fetch("/api/users?limit=0&select=username,image"),
        ])
        const postsData = await postsResponse.json()
        const usersData = await usersResponse.json()

        const postsWithUsers = postsData.posts.map((post: Post) => ({
            ...post,
            author: usersData.users.find((user: UserResponse) => user.id === post.userId),
        }))

        setPosts(postsWithUsers)
        setTotal(postsData.total)
        } catch (error) {
        console.error("태그별 게시물 가져오기 오류:", error)
        }
        setLoading(false)
    }

    return {
        searchQuery,
        setSearchQuery,
        limit,
        setLimit,
        skip,
        setSkip,
        newPost,
        setNewPost,
        selectedPost,
        setSelectedPost,
        posts,
        setPosts,
        total,
        setTotal,
        loading,
        setLoading,
        showAddDialog,
        setShowAddDialog,
        showEditDialog,
        setShowEditDialog,

        fetchPostsByTag,
        fetchPosts,
        addPost,
        updatePost,
        deletePost,
        searchPosts
    }
}
