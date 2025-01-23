import { useSearchParams } from "react-router-dom";
import { usePreservedCallback } from "../../../shared/hooks";
import { Button, Select } from "../../../shared/ui";
import { usePostsManagerActionsContext, usePostsManagerStateContext } from "./PostsManager";

const PostsManagerPagination = () => {
  const { posts } = usePostsManagerStateContext("PostsManagerPagination");
  const { onParamsChange } = usePostsManagerActionsContext("PostsManagerPagination");

  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = parseInt(searchParams.get("skip") || "0");

  const total = posts.length;

  const prev = usePreservedCallback(() => {
    onParamsChange("skip", Math.max(0, skip - limit));
  });

  const next = usePreservedCallback(() => {
    onParamsChange("skip", skip + limit);
  });

  const handleRowsPerPageChange = usePreservedCallback((value: string) => {
    onParamsChange("limit", parseInt(value));
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={handleRowsPerPageChange}>
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="10" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="10">10</Select.Item>
            <Select.Item value="20">20</Select.Item>
            <Select.Item value="30">30</Select.Item>
          </Select.Content>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={prev}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={next}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default PostsManagerPagination;
