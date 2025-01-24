import { Card, CardContent, CardHeader } from "../shared/ui";

import { UserModal } from "../entities/user/ui/UserModal.tsx";
import { DialogAddPost } from "../entities/post/ui/DialogAddPost.tsx";

import { useParams } from "../shared/hook/useParams.ts";
import { useInitializePosts } from "../shared/hook/useInitializePosts.ts";
import { usePostsQuery } from "../entities/post/hook/usePostsQuery.ts";

import { DialogPostDetail } from "../entities/post/ui/DialogPostDetail.tsx";
import { DialogEditPost } from "../entities/post/ui/DialogEditPost.tsx";
import { DialogAddComment } from "../entities/comment/ui/DialogAddComment.tsx";
import { DialogEditComment } from "../entities/comment/ui/DialogEditComment.tsx";
import { CardContentBody } from "../entities/card/ui/CardContentBody.tsx";
import { CardTitleContents } from "../entities/card/ui/CardTitleContents.tsx";

const PostsManager = () => {
  useInitializePosts();

  const { updateURL } = useParams();
  const { data: posts } = usePostsQuery();

  if (posts) {
    updateURL();
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitleContents />
      </CardHeader>
      <CardContent>
        <CardContentBody />
      </CardContent>
      <DialogAddPost />
      <DialogEditPost />
      <DialogAddComment />
      <DialogEditComment />
      <DialogPostDetail />
      <UserModal />
    </Card>
  );
};

export default PostsManager;
