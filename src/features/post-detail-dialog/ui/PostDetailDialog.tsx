import { DynamicIcon } from "lucide-react/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  IComment,
  useFetchCommentsByPostId,
  useModifyCommentMutation,
} from "../../../entities/comment/api";
import {
  CreateCommentData,
  useCreateCommentMutation,
} from "../../../entities/comment/api/createComment";
import { useDeleteCommentMutation } from "../../../entities/comment/api/deleteComment";
import { useControllableState, useOverlay, usePreservedCallback } from "../../../shared/hooks";
import { Button, Dialog } from "../../../shared/ui";
import Highlight from "../../../shared/ui/Highlight";
import { OverlayElementProps } from "../../../shared/ui/OverlayController";
import { IPostWithAuthor } from "../../../widgets/posts-manager/api";
import CreateCommentDialog from "../../create-comment-dialog/ui/CreateCommentDialog";
import ModifyCommentDialog from "../../modify-comment-dialog/ui/ModifyCommentDialog";

interface Props extends OverlayElementProps {
  post: IPostWithAuthor;
  initialComments: IComment[] | undefined;
  onCommentsLoaded: (comments: IComment[]) => void;
  onCommentCreate: (newComment: IComment) => void;
  onCommentModify: (modifiedComment: IComment) => void;
  onCommentDelete: (commentId: number) => void;
}

const PostDetailDialog = ({
  post,
  initialComments,
  opened: _opened,
  close,
  onCommentsLoaded,
  onCommentCreate,
  onCommentModify,
  onCommentDelete,
}: Props) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || "";

  const [opened, setOpened] = useControllableState({
    prop: _opened,
  });

  const handleOpenChange = usePreservedCallback((opened: boolean) => {
    if (!opened) close();
    setOpened(opened);
  });

  return (
    <Dialog open={opened} onOpenChange={handleOpenChange}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>
            <Highlight query={[searchQuery]}>{post.title}</Highlight>
          </Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>
            <Highlight query={[searchQuery]}>{post.body}</Highlight>
          </p>
          <Comments
            postId={post.id}
            initialComments={initialComments}
            onCommentsLoaded={onCommentsLoaded}
            onCommentCreate={onCommentCreate}
            onCommentModify={onCommentModify}
            onCommentDelete={onCommentDelete}
          />
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

/** -----------------------------------------------------------------------------------------------
 * Sub Components
 * --------------------------------------------------------------------------------------------- */

interface CommentsProps {
  postId: number;
  initialComments: IComment[] | undefined;
  onCommentsLoaded: (comments: IComment[]) => void;
  onCommentCreate: (newComment: IComment) => void;
  onCommentModify: (modifiedComment: IComment) => void;
  onCommentDelete: (commentId: number) => void;
}

const Comments = ({
  postId,
  initialComments,
  onCommentsLoaded: _onCommentsLoaded,
  onCommentCreate,
  onCommentModify,
  onCommentDelete,
}: CommentsProps) => {
  const [comments, setComments] = useState<IComment[] | undefined>(initialComments);

  const overlay = useOverlay();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data } = useFetchCommentsByPostId(
    {
      postId,
      limit: 0,
    },
    {
      enabled: !comments,
    },
  );

  const { mutateAsync: createMutateAsync } = useCreateCommentMutation();
  const { mutate: modifyMutate } = useModifyCommentMutation();
  const { mutate: deleteMutate } = useDeleteCommentMutation();

  const onCommentsLoaded = usePreservedCallback(_onCommentsLoaded);

  const handleCommentCreate = usePreservedCallback(async (newComment: CreateCommentData) => {
    const _comment = await createMutateAsync(newComment);
    const comment = {
      ..._comment,
      id: Date.now(),
      likes: 0,
    };

    setComments((prev) => [...(prev || []), comment]);
    onCommentCreate(comment);
  });

  const handleCommentModify = usePreservedCallback((modifiedComment: IComment) => {
    modifyMutate(modifiedComment);

    setComments((prev) =>
      prev?.map((comment) => (comment.id === modifiedComment.id ? modifiedComment : comment)),
    );
    onCommentModify(modifiedComment);
  });

  const handleCommentDelete = usePreservedCallback((commentId: number) => {
    setComments((prev) => prev?.filter((comment) => comment.id !== commentId));

    deleteMutate(commentId);
    onCommentDelete(commentId);
  });

  useEffect(() => {
    if (data && !comments) {
      setComments(data.comments);
      onCommentsLoaded(data.comments);
    }
  }, [data, comments, onCommentsLoaded]);

  if (!comments) return null;

  return (
    <div className="mt-2">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            overlay.open((props) => (
              <CreateCommentDialog
                {...props}
                postId={postId}
                onCommentCreate={handleCommentCreate}
              />
            ));
          }}
        >
          <DynamicIcon name="plus" className="mr-1 h-3 w-3" />
          댓글 추가
        </Button>
      </div>
      <div className="w-full space-y-1">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center border-b pb-1 text-sm">
            <div className="flex min-w-0 grow basis-0 space-x-2 overflow-hidden">
              <span className="grow-0 basis-auto truncate">{comment.user.username}:</span>
              <span className="min-w-0 grow basis-0 truncate">
                <Highlight query={[searchQuery]}>{comment.body}</Highlight>
              </span>
            </div>
            <div className="grow-0 basis-auto space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleCommentModify({
                    ...comment,
                    likes: comment.likes + 1,
                  });
                }}
              >
                <DynamicIcon name="thumbs-up" className="h-3 w-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  overlay.open((props) => (
                    <ModifyCommentDialog
                      {...props}
                      comment={comment}
                      onCommentModify={(modifiedComment) => {
                        handleCommentModify({
                          ...comment,
                          body: modifiedComment.body,
                        });
                      }}
                    />
                  ));
                }}
              >
                <DynamicIcon name="edit-2" className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleCommentDelete(comment.id)}>
                <DynamicIcon name="trash-2" className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetailDialog;
