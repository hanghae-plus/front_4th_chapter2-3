import { DashboardHeader } from "./ui/dashboardHeader";
import { DashboardContent } from "./ui/dashboardContent";
import { Card, CardContent } from "../../shared/ui";
import { useLocation, useNavigate } from "react-router-dom";
import { PostFilters } from "../../pages/postsManager/ui/PostFilters";
import { useState, useEffect } from "react";
import { useSearch } from "./hooks/useSearch";
import { Post, User, PostApiResponse, SortBy, SortOrder } from "../../entities/types";

export const PostDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"));
  const [sortBy, setSortBy] = useState<SortBy>(() => {
    const param = queryParams.get("sortBy");
    return (param === "none" || param === "id" || param === "title" || param === "reactions") ? param : "none";
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    const param = queryParams.get("sortOrder");
    return param === "desc" ? "desc" : "asc";
  });
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");
  const [loading, setLoading] = useState(false);
  const { searchTerm, setSearchTerm, filteredPosts } = useSearch(posts, "title");

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchTerm) params.set("search", searchTerm);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);
    navigate(`?${params.toString()}`);
  }

  // 게시물 가져오기
  const fetchPosts = () => {
    setLoading(true)
    let postsData: PostApiResponse;
    let usersData: User[];

    fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        postsData = data
        return fetch("/api/users?limit=0&select=username,image")
      })
      .then((response) => response.json())
      .then((users) => {
        usersData = users.users
        const postsWithUsers = postsData.posts.map((post: Post) => ({
          ...post,
          author: usersData.find((user: User) => user.id === post.userId),
        }))
        setPosts(postsWithUsers)
        setTotal(postsData.total)
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
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
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 초기 데이터 로드 및 URL 동기화
  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, searchTerm, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchTerm(params.get("search") || "");
    // SortBy 처리
    const sortByParam = params.get("sortBy");
    setSortBy((sortByParam === "none" || sortByParam === "id" || 
              sortByParam === "title" || sortByParam === "reactions") 
              ? sortByParam : "none");
    
    // SortOrder 처리
    const sortOrderParam = params.get("sortOrder");
    setSortOrder(sortOrderParam === "desc" ? "desc" : "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search])


  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardContent className="p-6">
        <DashboardHeader />
        <PostFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          tags={tags}
          updateURL={updateURL}
        />
        <DashboardContent 
          posts={filteredPosts} 
          loading={loading} 
          total={total} 
        />
      </CardContent>
    </Card>
  );
  
};