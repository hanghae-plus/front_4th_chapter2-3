import { useSearchParams } from "react-router-dom";
import { useFetchAllTagsQuery } from "../../../entities/tag/api";
import { Search, Select } from "../../../shared/ui";
import { usePostsManagerActionsContext } from "./PostsManager";

const PostsManagerControlPanel = () => {
  const [searchParams] = useSearchParams();

  const { onParamsChange } = usePostsManagerActionsContext("PostsManagerControlPanel");

  const { data: tags = [] } = useFetchAllTagsQuery();

  const selectedTag = searchParams.get("selectedTag") || "all";
  const sortBy = searchParams.get("sortBy") || "";
  const order = searchParams.get("order") || "";

  return (
    <div className="flex gap-4">
      <Search
        placeholder="게시물 검색..."
        onSearch={(value) => onParamsChange("searchQuery", value)}
      />
      <Select value={selectedTag} onValueChange={(value) => onParamsChange("selectedTag", value)}>
        <Select.Trigger className="w-[180px]">
          <Select.Value placeholder="태그 선택" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="all">모든 태그</Select.Item>
          {tags.map((tag) => (
            <Select.Item key={tag.url} value={tag.slug}>
              {tag.slug}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <Select value={sortBy} onValueChange={(value) => onParamsChange("sortBy", value)}>
        <Select.Trigger className="w-[180px]">
          <Select.Value placeholder="정렬 기준" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="none">없음</Select.Item>
          <Select.Item value="id">ID</Select.Item>
          <Select.Item value="title">제목</Select.Item>
          <Select.Item value="reactions">반응</Select.Item>
        </Select.Content>
      </Select>
      <Select value={order} onValueChange={(value) => onParamsChange("order", value)}>
        <Select.Trigger className="w-[180px]">
          <Select.Value placeholder="정렬 순서" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="asc">오름차순</Select.Item>
          <Select.Item value="desc">내림차순</Select.Item>
        </Select.Content>
      </Select>
    </div>
  );
};

export default PostsManagerControlPanel;
