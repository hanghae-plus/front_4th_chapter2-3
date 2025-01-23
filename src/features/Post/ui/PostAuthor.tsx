interface PostAuthorProps {
  author: { image: string; username: string };
  onOpen: (author: { image: string; username: string }) => void;
}

export const PostAuthor = ({ author, onOpen }: PostAuthorProps) => (
  <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onOpen(author)}>
    <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
    <span>{author?.username}</span>
  </div>
);
