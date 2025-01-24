import { useAtom, useAtomValue } from "jotai";
import { highlightText } from "../../../shared/lib/handleHighlightText";
import { DialogWrapper } from "../../../shared/ui/dialog/DialogWrapper";
import {
  postDetailDialogAtom,
  searchQueryAtom,
  selectedPostAtom,
} from "../../../app/store/atom";
import { CommentItem } from "../../../features/comment/ui/CommentItem";

export const DialogPostDetail = () => {
  const searchQuery = useAtomValue(searchQueryAtom);
  const selectedPost = useAtomValue(selectedPostAtom);

  const [showPostDetailDialog, setShowPostDetailDialog] =
    useAtom(postDetailDialogAtom);

  return (
    <DialogWrapper
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
      title={highlightText(selectedPost.title, searchQuery) ?? ""}
    >
      <p>{highlightText(selectedPost.body, searchQuery)}</p>
      <CommentItem />
    </DialogWrapper>
  );
};
