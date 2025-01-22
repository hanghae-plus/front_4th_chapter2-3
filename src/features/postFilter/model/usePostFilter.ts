import { useCallback, useState } from "react";
import { filterPostByTag, sortPost } from "@features/postFilter/lib";
import { usePostStore } from "@core/store/usePostStore.ts";
import { useTagStore } from "@core/store/useTagStore.ts";

export const usePostFilter = () => {
  const { posts, setFilteredPosts } = usePostStore();
  const { setSelectedTag } = useTagStore();
  const [sortColumn, setSortColumn] = useState("none");
  const [sortOrder, setSortOrder] = useState("desc");

  // 오름차순, 내림차순 정렬
  const handleSortOrder = useCallback(
    (newSortOrder: string) => {
      setSortOrder(newSortOrder);
      setFilteredPosts(sortPost([...posts], sortColumn, newSortOrder));
    },
    [posts, setFilteredPosts, sortColumn],
  );

  // 태그를 기준으로 필터링
  const handleSelectTag = useCallback(
    (tagName: string) => {
      setSelectedTag(tagName);
      setFilteredPosts(filterPostByTag([...posts], tagName));
    },
    [posts, setFilteredPosts],
  );

  // ID, 제목, 반응 등 컬럼을 기준으로 정렬
  const handleSortColumn = useCallback(
    (newSortColumn: string) => {
      setSortColumn(newSortColumn);
      setFilteredPosts(sortPost([...posts], newSortColumn, sortOrder));
    },
    [posts, setFilteredPosts, sortOrder],
  );

  return {
    handleSelectTag,
    sortColumn,
    handleSortColumn,
    sortOrder,
    handleSortOrder,
  };
};
