import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import {
  useModal,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  highlightText,
} from "../../../shared";
import { fetchUser, Post, User, UserDetail } from "../../../entities";

// 게시물 테이블 렌더링
export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  setSelectedTag,
  updateURL,
  setSelectedUser,
  openPostDetail,
  removePost,
  openPostEdit,
}: {
  posts: Post[];
  searchQuery: string;
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  updateURL: () => void;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserDetail | null>>;
  openPostDetail: (p: Post) => void;
  removePost: (id: Post["id"]) => Promise<void>;
  openPostEdit: (post: Post) => void;
}) => {
  const { handleModalToggle } = useModal("userModal");
  const { handleModalToggle: handlePostDetailModal } = useModal("postDetailModal");
  const { handleModalToggle: handlePostEditModal } = useModal("modifyPostModal");

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const userData = await fetchUser({ id: user.id });
      setSelectedUser(userData);
      handleModalToggle();
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag);
                        updateURL();
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author!)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    openPostDetail(post);
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    openPostEdit(post);
                    handlePostDetailModal();
                    handlePostEditModal();
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => removePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
