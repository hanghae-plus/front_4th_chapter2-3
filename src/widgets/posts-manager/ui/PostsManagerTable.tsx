import { DynamicIcon } from "lucide-react/dynamic";
import { useSearchParams } from "react-router-dom";
import { useDeletePostMutation } from "../../../entities/post/api/deletePost";
import ModifyPostDialog from "../../../features/modify-post-dialog/ui/ModifyPostDialog";
import PostDetailDialog from "../../../features/post-detail-dialog/ui/PostDetailDialog";
import UserInfoModal from "../../../features/user-info-dialog/ui/UserInfoModal";
import { useOverlay } from "../../../shared/hooks";
import { Button, Table, Tag } from "../../../shared/ui";
import Highlight from "../../../shared/ui/Highlight";
import { usePostsManagerActionsContext, usePostsManagerStateContext } from "./PostsManager";

const PostsManagerTable = () => {
  const { posts, comments } = usePostsManagerStateContext("PostsManagerTable");
  const {
    modifyPost,
    deletePost,
    setComments,
    createComment,
    modifyComment,
    deleteComment,
    onParamsChange,
  } = usePostsManagerActionsContext("PostsManagerTable");

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || "";
  const selectedTag = searchParams.get("selectedTag") || "";
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = parseInt(searchParams.get("skip") || "0");

  const { mutate: deleteMutate } = useDeletePostMutation();

  const overlay = useOverlay();

  return (
    <div className="my-4">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head className="w-[50px]">ID</Table.Head>
            <Table.Head>제목</Table.Head>
            <Table.Head className="w-[150px]">작성자</Table.Head>
            <Table.Head className="w-[150px]">반응</Table.Head>
            <Table.Head className="w-[150px]">작업</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {posts.slice(skip, skip + limit).map((post) => (
            <Table.Row key={post.id}>
              <Table.Cell>{post.id}</Table.Cell>
              <Table.Cell>
                <div className="space-y-1">
                  <div>
                    <Highlight query={[searchQuery]}>{post.title}</Highlight>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag) => (
                      <Tag
                        key={tag}
                        active={tag === selectedTag}
                        onActiveChange={(active) => {
                          if (active) {
                            onParamsChange("selectedTag", tag);
                          } else {
                            onParamsChange("selectedTag", "");
                          }
                        }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <button
                  className="flex cursor-pointer items-center space-x-2"
                  onClick={() => {
                    overlay.open((props) => <UserInfoModal {...props} userId={post.userId} />);
                  }}
                >
                  <img
                    src={post.author?.image}
                    alt={post.author?.username}
                    className="h-8 w-8 rounded-full"
                  />
                  <span>{post.author?.username}</span>
                </button>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <DynamicIcon name="thumbs-up" size="16px" />
                  <span>{post.reactions.likes || 0}</span>
                  <DynamicIcon name="thumbs-down" size="16px" />
                  <span>{post.reactions.dislikes || 0}</span>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      overlay.open((props) => (
                        <PostDetailDialog
                          {...props}
                          post={post}
                          initialComments={comments[post.id]}
                          onCommentsLoaded={(comments) => setComments(post.id, comments)}
                          onCommentCreate={(newComment) => createComment(post.id, newComment)}
                          onCommentModify={(modifiedComment) =>
                            modifyComment(post.id, modifiedComment)
                          }
                          onCommentDelete={(commentId) => deleteComment(post.id, commentId)}
                        />
                      ));
                    }}
                  >
                    <DynamicIcon name="message-square" size="16px" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      overlay.open((props) => (
                        <ModifyPostDialog
                          {...props}
                          post={post}
                          onPostModify={(modifiedPost) => modifyPost({ ...post, ...modifiedPost })}
                        />
                      ));
                    }}
                  >
                    <DynamicIcon name="edit-2" size="16px" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      deleteMutate(post.id);
                      deletePost(post.id);
                    }}
                  >
                    <DynamicIcon name="trash-2" size="16px" />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PostsManagerTable;
