import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "../shared/ui";

import { UserModal } from "../entities/user/ui/UserModal.tsx";
import { DialogAddPost } from "../entities/post/ui/DialogAddPost.tsx";

import { useAtom } from "jotai";
import {
  selectedTagAtom,
  limitAtom,
  skipAtom,
  sortByAtom,
  sortOrderAtom,
} from "../app/store/atom.ts";
import { usePosts } from "../entities/post/lib/usePosts.ts";
import { useTags } from "../entities/tag/lib/useTags.ts";
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
  const [selectedTag] = useAtom(selectedTagAtom);
  const [skip] = useAtom(skipAtom);
  const [limit] = useAtom(limitAtom);
  const [sortBy] = useAtom(sortByAtom);
  const [sortOrder] = useAtom(sortOrderAtom);

  const { handleFetchTags } = useTags();

  const { handleFetchPost, handleFetchPostsByTag } = usePosts();

  useEffect(() => {
    handleFetchTags();
  }, [handleFetchTags]);

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
