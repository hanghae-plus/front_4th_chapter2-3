import { useEffect } from "react";
import { usePostStore } from "../../../entities/post/model/store";
import { PostCard } from "../../../entities/post/ui/postCard";
import { postApi } from "../../../entities/post/api/postApi";
import { Button } from "@/shared/ui";

export const DashboardContent = () => {
  const { posts, pagination, filters, setPosts, setTotal } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postApi.getPosts({ ...pagination, ...filters });
        setPosts(response.posts);
        setTotal(response.total);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [pagination, filters]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            highlight={filters.search}
          />
        ))}
      </div>
      {/* Pagination controls... */}
    </div>
  );
};