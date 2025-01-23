import { useState } from "react";

import { Search } from "lucide-react";

import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";

import { POST_FILTER_PARAM } from "../config";
import { usePostFilter, useSuspenseQueryGetTags } from "../model";

export const PostFilter = () => {
  const { data: tags } = useSuspenseQueryGetTags();
  const { params, changePostFilterParams } = usePostFilter();
  const [searchQuery, setSearchQuery] = useState(params.searchQuery);

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && changePostFilterParams(POST_FILTER_PARAM.SEARCH, searchQuery)}
          />
        </div>
      </div>
      <Select
        value={params.tag}
        onValueChange={(value) => {
          changePostFilterParams(POST_FILTER_PARAM.TAG, value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={params.sortBy} onValueChange={(value) => changePostFilterParams(POST_FILTER_PARAM.SORT_BY, value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select value={params.order} onValueChange={(value) => changePostFilterParams(POST_FILTER_PARAM.ORDER, value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
