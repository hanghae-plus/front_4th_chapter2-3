import { DashboardHeader } from "./ui/dashboardHeader";
import { DashboardContent } from "./ui/dashboardContent";
import { Card, CardContent } from "../../shared/ui";
import { useLocation, useNavigate } from "react-router-dom";
import { PostFilters } from "../../features/postManagement/ui/postFilters";
import { useState, useEffect } from "react";
import { useSearch } from "../../shared/hooks/useSearch";
import { Post, User, PostApiResponse, SortBy, SortOrder } from "../../entities/types";
import { PostPagination } from "../../features/postManagement/ui/postPagination";
import { usePostStore } from "../../entities/post/model/store";
import { postApi } from "../../entities/post/api/postApi";
import { usePostContext } from "../../features/postManagement/model/PostContext";
interface PostDashboardProps {
  onPostDetail?: (postId: number) => Promise<void>;
  onUserClick?: (user: User) => Promise<void>;
}

export const PostDashboard: React.FC<PostDashboardProps> = ()  => {
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { dispatch } = usePostContext();

  const { 
    posts,
    total,
    pagination: { skip, limit },
    loading,
    filters: { sortBy, sortOrder },
    setPagination,
    setPosts,
    setTotal,
    setLoading,
    setFilters
  } = usePostStore();
  
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");
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

  const handleSortByChange = (value: SortBy) => {
    setFilters({ sortBy: value });
  };

  const handleSortOrderChange = (value: SortOrder) => {
    setFilters({ sortOrder: value });
  };

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
  }, [skip, limit, sortBy, sortOrder, searchTerm, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setPagination({
     skip: parseInt(params.get("skip") || "0"),
     limit: parseInt(params.get("limit") || "10")
   });

    setSearchTerm(params.get("search") || "");

    const sortByParam = params.get("sortBy");
    const validSortBy = (val: string | null): val is SortBy => 
      val !== null && ['none', 'id', 'title', 'reactions'].includes(val);

    const sortOrderParam = params.get("sortOrder");
    const validSortOrder = (val: string | null): val is SortOrder =>
      val !== null && ['asc', 'desc'].includes(val);
   
    setFilters({
      sortBy: validSortBy(sortByParam) ? sortByParam : 'none',
      sortOrder: validSortOrder(sortOrderParam) ? sortOrderParam : 'asc'
    });

    setSelectedTag(params.get("tag") || "");
  }, [location.search]);

  const handleLimitChange = (newLimit: number) => {
    setPagination({ limit: newLimit });
  };
  
  const handlePrevPage = () => {
    setPagination({ 
      skip: Math.max(0, skip - limit)
    });
  };
  
  const handleNextPage = () => {
    setPagination({ 
      skip: skip + limit 
    });
  };

  return (
    <Card className="w-full max-w-7xl mx-auto border border-gray-300 rounded">
      <CardContent className="p-6">
        <DashboardHeader />
        <PostFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          sortBy={sortBy as SortBy}
          setSortBy={handleSortByChange}
          sortOrder={sortOrder as SortOrder}
          setSortOrder={handleSortOrderChange}
          tags={tags}
          updateURL={updateURL}
        />
        <DashboardContent 
          posts={filteredPosts} 
          loading={loading} 
          total={total}
          onPostDetail={async (postId) => {
            try {
              const postDetails = await postApi.getPostById(postId);
              dispatch({ type: "SET_SELECTED_POST", payload: postDetails });
            } catch (error) {
              console.error("게시물 상세 정보 가져오기 실패:", error);
            }
          }}
        />
        <PostPagination 
          total={total}
          skip={skip}
          limit={limit}
          onLimitChange={handleLimitChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
        </CardContent>
    </Card>
  );
  
};