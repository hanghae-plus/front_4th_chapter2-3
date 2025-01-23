import { Search, Plus } from "lucide-react";
import {
  Button,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui";
import { JSX, useEffect, useState } from "react";
import { fetchPosts, fetchPostsByTag, fetchUsers, mergePostAndUsers, Post, Tag, UserDetail } from "../../../entities";
import { searchPosts } from "../../../features";
import { PostTable } from "./PostTable";

interface PostsTableProps {
  posts: Post[];
  setShowAddDialog: (_: boolean) => void;
  searchQuery: string;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  updateURL: () => void;
  tags: Tag[];
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  highlightText: (text: string, highlight: string) => JSX.Element | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserDetail | null>>;
  openPostDetail: (post: Post) => void;
  removePost: (id: Post["id"]) => Promise<void>;
  openPostEdit: (post: Post) => void;
}

export const PostsManager = ({
  posts,
  setShowAddDialog,
  searchQuery,
  setPosts,
  setTotal,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  updateURL,
  tags,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  limit,
  setLimit,
  skip,
  setSkip,
  total,
  highlightText,
  setSelectedUser,
  openPostDetail,
  removePost,
  openPostEdit,
}: PostsTableProps) => {
  const [loading, setLoading] = useState(false);
  // 태그별 게시물 가져오기
  const setFetchedPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      setPostsAndTotal();
      return;
    }
    setLoading(true);
    try {
      const [postsData, usersData] = await Promise.all([fetchPostsByTag(tag), fetchUsers()]);
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error);
    }
    setLoading(false);
  };

  // 게시물 가져오기
  const setPostsAndTotal = async () => {
    try {
      setLoading(true);

      const [postsData, usersData] = await Promise.all([
        fetchPosts({ limit, skip }),
        fetchUsers().then((x) => x.users),
      ]);

      const postsWithUsers = mergePostAndUsers(postsData.posts, usersData);

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error("게시물 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 게시물 검색
  const setSearchedPosts = async () => {
    if (!searchQuery) {
      await setPostsAndTotal();
      return;
    }
    setLoading(true);
    try {
      const data = await searchPosts({ searchQuery });
      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error("게시물 검색 오류:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedTag) {
      setFetchedPostsByTag(selectedTag);
    } else {
      setPostsAndTotal();
    }
    updateURL();
  }, [skip, limit, sortBy, sortOrder]);

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && setSearchedPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value);
                setFetchedPostsByTag(value);
                updateURL();
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              highlightText={highlightText}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              setSelectedUser={setSelectedUser}
              openPostDetail={openPostDetail}
              removePost={removePost}
              openPostEdit={openPostEdit}
            />
          )}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};
