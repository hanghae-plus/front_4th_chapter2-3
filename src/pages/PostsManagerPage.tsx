import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/ui";

import { Tag } from "@entities/index";
import { PostAddDialog, PostDetailDialog, PostEditDialog, usePostQuery, usePostStore } from "@features/post";
import { UserDialog, useUserQuery } from "@features/user";
import { useTagQuery } from "@features/tag";
import { getPostWithUser } from "@features/post/model/post";
import PostTable from "@features/post/ui/PostTable";

import { CommentAddDialog, CommentEditDialog } from "@features/comment";

const PostsManager = () => {
  const [loading, setLoading] = useState(false);

  const { total, setPosts, setShowAddDialog } = usePostStore();

  const {
    data: postsData,
    isSuccess: isPostsSuccess,
    isLoading: isPostsLoading,
    limit,
    skip,
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    updatePostSearchParams,
  } = usePostQuery();

  const { data: usersData, isSuccess: isUsersSucess, isLoading: isUsersLoading } = useUserQuery();
  const { data: tags } = useTagQuery();

  useEffect(() => {
    if (isPostsSuccess && isUsersSucess) {
      const postsWithUsers = postsData?.posts.map((post) => getPostWithUser(post, usersData.users)) ?? [];
      setPosts(postsWithUsers);
    }
  }, [isPostsSuccess, isUsersSucess, postsData, usersData, setPosts]);

  useEffect(() => {
    setLoading(isPostsLoading || isUsersLoading);
  }, [isPostsLoading, isUsersLoading]);

  // 게시물 검색
  const searchPosts = async (searchQuery: string) => {
    updatePostSearchParams("searchQuery", searchQuery);
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (tag === "all") {
      updatePostSearchParams("selectedTag", "");
      return;
    }
    updatePostSearchParams("selectedTag", tag);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
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
                  defaultValue={searchQuery}
                  onKeyPress={(e) => e.key === "Enter" && searchPosts(e.target.value)}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value: string) => {
                fetchPostsByTag(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags?.map((tag: Tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value) => updatePostSearchParams("sortBy", value)}>
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
            <Select value={sortOrder} onValueChange={(value) => updatePostSearchParams("sortOrder", value)}>
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
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  updatePostSearchParams("limit", value);
                }}
              >
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
              <Button
                disabled={skip === 0}
                onClick={() => updatePostSearchParams("sortBy", Math.max(0, skip - limit).toString())}
              >
                이전
              </Button>
              <Button
                disabled={skip + limit >= total}
                onClick={() => updatePostSearchParams("skip", (skip + limit).toString())}
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog />

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />

      {/* 사용자 모달 */}
      <UserDialog />
    </Card>
  );
};

export default PostsManager;
