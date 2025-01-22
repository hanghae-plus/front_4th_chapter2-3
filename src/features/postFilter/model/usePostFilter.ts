import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePost } from "@entities/post/model/usePost.ts";
import { createURLParams } from "@features/postFilter/lib/createURLParams.ts";
import { filterPostsBySearch } from "@features/postFilter/lib/filterPostsBySearch.ts";
import { filterPostsByTag } from "@features/postFilter/lib/filterPostsByTag.ts";
import { sortPosts } from "@features/postFilter/lib/sortPosts.ts";
import { usePostStore } from "@core/store/usePostStore.ts";

export const usePostFilter = () => {
  const { posts, setPosts } = usePostStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortColumn, setSortColumn] = useState("none");
  const [sortOrder, setSortOrder] = useState("desc");

  const location = useLocation();
  const navigate = useNavigate();
  const { initializePosts, updatePosts } = usePost();

  const updateURL = useCallback(() => {
    const params = createURLParams(searchQuery, selectedTag, sortColumn, sortOrder);
    navigate(`${location.pathname}?${params}`);
  }, []);

  const searchPosts = useCallback(() => {
    if (!searchQuery.trim()) {
      initializePosts();
      return;
    }

    const filteredPosts = filterPostsBySearch(posts, searchQuery);
    setPosts(filteredPosts);
    updateURL();
  }, []);

  // 태그를 기준으로 필터링
  const fetchPostsByTag = useCallback(
    (tag: string) => {
      setSelectedTag(tag);
      updatePosts((currentPosts) => {
        return filterPostsByTag([...currentPosts], tag);
      });
    },
    [updatePosts],
  );

  // ID, 제목, 반응 등 컬럼을 기준으로 재정렬
  const handleSortColumn = useCallback(
    (newSortColumn: string) => {
      setSortColumn(newSortColumn);
      updatePosts((currentPosts) => {
        return sortPosts([...currentPosts], newSortColumn, sortOrder);
      });
    },
    [sortOrder, updatePosts],
  );

  return {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    sortColumn,
    handleSortColumn,
    sortOrder,
    setSortOrder,
    searchPosts,
    fetchPostsByTag,
    updateURL,
  };
};
