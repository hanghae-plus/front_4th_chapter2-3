interface PostTag {
  tag: string;
  isSelected: boolean;
  onSelect: (tag: string) => void;
}

export const PostTag = ({ tag, isSelected, onSelect }: PostTag) => (
  <span
    className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
      isSelected
        ? 'text-white bg-blue-500 hover:bg-blue-600'
        : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
    }`}
    onClick={() => onSelect(tag)}
  >
    {tag}
  </span>
);
