import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui";

import { PostAddDialog, PostDetailDialog, PostEditDialog, PostTable } from "@widgets/post";
import { useUserQuery } from "@features/user";
import { getPostWithUser } from "@features/post/model/post";

import { CommentAddDialog, CommentEditDialog } from "@widgets/comment";
import { usePostQuery, usePostStore } from "@features/post";
import { UserDialog } from "@widgets/user";
import { PaginationBar, SearchFilterBar } from "@widgets/ui";

const PostsManager = () => {
  const [loading, setLoading] = useState(false);

  const { setPosts, setShowAddDialog } = usePostStore();

  const { data: postsData, isSuccess: isPostsSuccess, isLoading: isPostsLoading } = usePostQuery();

  const { data: usersData, isSuccess: isUsersSucess, isLoading: isUsersLoading } = useUserQuery();

  useEffect(() => {
    if (isPostsSuccess && isUsersSucess) {
      const postsWithUsers = postsData?.posts.map((post) => getPostWithUser(post, usersData.users)) ?? [];
      setPosts(postsWithUsers);
    }
  }, [isPostsSuccess, isUsersSucess, postsData, usersData, setPosts]);

  useEffect(() => {
    setLoading(isPostsLoading || isUsersLoading);
  }, [isPostsLoading, isUsersLoading]);

  const renderPostTable = () => <PostTable />;

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
          <SearchFilterBar />
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}
          <PaginationBar />
        </div>
      </CardContent>

      <PostEditDialog />
      <PostAddDialog />
      <PostDetailDialog />

      <CommentAddDialog />
      <CommentEditDialog />

      <UserDialog />
    </Card>
  );
};

export default PostsManager;
