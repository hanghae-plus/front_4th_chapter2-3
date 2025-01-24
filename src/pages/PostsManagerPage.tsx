import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../shared/ui";
import { Post, Comment, Tag, fetchTags, deletePost, UserDetail } from "../entities";

import { fetchCommentsByPostId } from "../features";
import { PostsManager } from "../widgets/PostsManager/ui/PostsManager";
import { UserInformationDialog } from "../widgets/ui/UserInformationDialog";
import { ModalProvider } from "../shared";
import { PostDetailDialog } from "../widgets/ui/PostDetailDialog";
import { CommentModifyDialog } from "../widgets/ui/CommentModifyDialog";
import { CommentAddDialog } from "../widgets/ui/CommentAddDialog";
import { PostModifyDialog } from "../widgets/ui/PostModifyDialog";
import { PostAddDialog } from "../widgets/ui/PostAddDialog";

const PostsManagerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"));
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 });
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");
  const [comments, setComments] = useState<Record<Post["id"], Comment[]>>({});
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [newComment, setNewComment] = useState<Comment>({
    id: 0,
    body: "",
    postId: null,
    likes: 0,
    user: null,
  });
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);
    navigate(`?${params.toString()}`);
  };

  // 태그 가져오기
  const setFetchedTags = async () => {
    try {
      setTags(await fetchTags());
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    }
  };

  // 게시물 삭제
  const removePost = async (id: Post["id"]) => {
    try {
      await deletePost({ postId: id });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  // 댓글 가져오기
  const fetchComments = async (postId: Post["id"]) => {
    if (comments?.[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await fetchCommentsByPostId({ postId });
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
  };

  const openPostEdit = (post: Post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    setFetchedTags();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search]);

  return (
    <ModalProvider
      modalKeys={[
        "userModal",
        "addPostModal",
        "modifyPostModal",
        "addCommentModal",
        "modifyCommentModal",
        "postDetailModal",
      ]}
    >
      <Card className="w-full max-w-6xl mx-auto">
        <PostsManager
          posts={posts}
          searchQuery={searchQuery}
          setPosts={setPosts}
          setTotal={setTotal}
          setSearchQuery={setSearchQuery}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          updateURL={updateURL}
          tags={tags}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          limit={limit}
          setLimit={setLimit}
          skip={skip}
          setSkip={setSkip}
          total={total}
          setSelectedUser={setSelectedUser}
          openPostDetail={openPostDetail}
          removePost={removePost}
          openPostEdit={openPostEdit}
        />

        <PostAddDialog posts={posts} setPosts={setPosts} newPost={newPost} setNewPost={setNewPost} />

        <PostModifyDialog post={selectedPost!} setSelectedPost={setSelectedPost} posts={posts} setPosts={setPosts} />

        <CommentAddDialog newComment={newComment} setNewComment={setNewComment} setComments={setComments} />

        {selectedComment && (
          <CommentModifyDialog
            comment={selectedComment}
            setSelectedComment={setSelectedComment}
            setComments={setComments}
          />
        )}

        {selectedPost && (
          <PostDetailDialog
            post={selectedPost}
            searchQuery={searchQuery}
            comments={comments}
            setComments={setComments}
            setNewComment={setNewComment}
            setSelectedComment={setSelectedComment}
          />
        )}

        {selectedUser && <UserInformationDialog user={selectedUser} />}
      </Card>
    </ModalProvider>
  );
};

export default PostsManagerPage;
