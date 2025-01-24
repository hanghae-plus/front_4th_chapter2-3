import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  editDialogAtom,
  selectedPostAtom,
  selectedTagAtom,
} from "../../../app/store/atom";
import { searchQueryAtom } from "../../../app/store/atom";
import { highlightText } from "../../../shared/lib/handleHighlightText";
import { TableCell, TableRow } from "../../../shared/ui";
import { Post } from "../../../entities/post/model/types";
import { PostAuthor } from "./PostAuthor";
import { PostIcons } from "./PostIcons";
import { PostReactions } from "./PostReactions";
import { usePosts } from "../../../entities/post/hook/usePosts";
import { useParams } from "../../../shared/hook/useParams";

interface PostRowProps {
  post: Post;
}

export const PostRow: React.FC<PostRowProps> = ({ post }) => {
  const searchQuery = useAtomValue(searchQueryAtom);

  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);

  const setSelectedPost = useSetAtom(selectedPostAtom);
  const setShowEditDialog = useSetAtom(editDialogAtom);

  const { handleDeletePost } = usePosts();
  const { updateURL } = useParams();

  return (
    <TableRow>
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
      <PostAuthor post={post} />
      <PostReactions
        likes={post.reactions?.likes || 0}
        dislikes={post.reactions?.dislikes || 0}
      />
      <PostIcons
        post={post}
        onEdit={() => {
          setSelectedPost(post);
          setShowEditDialog(true);
        }}
        onDelete={() => handleDeletePost(post.id)}
      />
    </TableRow>
  );
};
