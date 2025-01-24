import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "../shared/ui";

import { UserModal } from "../entities/user/ui/UserModal.tsx";
import { DialogAddPost } from "../entities/post/ui/DialogAddPost.tsx";

import { useAtomValue } from "jotai";
import {
  selectedTagAtom,
  limitAtom,
  skipAtom,
  sortByAtom,
  sortOrderAtom,
} from "../app/store/atom.ts";
import { usePosts } from "../entities/post/hook/usePosts.ts";
import { useParams } from "../shared/hook/useParams.ts";
import { useInitializePosts } from "../shared/hook/useInitializePosts.ts";
import { DialogPostDetail } from "../entities/post/ui/DialogPostDetail.tsx";
import { DialogEditPost } from "../entities/post/ui/DialogEditPost.tsx";
import { DialogAddComment } from "../entities/comment/ui/DialogAddComment.tsx";
import { DialogEditComment } from "../entities/comment/ui/DialogEditComment.tsx";
import { CardContentBody } from "../entities/card/ui/CardContentBody.tsx";
import { CardTitleContents } from "../entities/card/ui/CardTitleContents.tsx";

const PostsManager = () => {
  // 전역 변수
  const selectedTag = useAtomValue(selectedTagAtom);
  const skip = useAtomValue(skipAtom);
  const limit = useAtomValue(limitAtom);
  const sortBy = useAtomValue(sortByAtom);
  const sortOrder = useAtomValue(sortOrderAtom);

  const { handleFetchPost, handleFetchPostsByTag } = usePosts();

  const { updateURL } = useParams();

  // usePost
  useEffect(() => {
    if (selectedTag) {
      handleFetchPostsByTag(selectedTag);
    } else {
      handleFetchPost();
    }
    updateURL();
  }, [
    skip,
    limit,
    sortBy,
    sortOrder,
    selectedTag,
    handleFetchPost,
    handleFetchPostsByTag,
    updateURL,
  ]);

  useInitializePosts();

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
