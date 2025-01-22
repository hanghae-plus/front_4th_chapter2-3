import { useState } from "react";
import { useTagStore } from "@core/store/useTagStore";
import { Tag } from "@/types/tag";
import { fetchTags, updateTag, deleteTag } from "../api";

export const useTag = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { tags, setTags } = useTagStore();

  const initializeTags = async () => {
    setIsLoading(true);
    try {
      const fetchedTags = await fetchTags();
      setTags(fetchedTags);
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeTag = async (slug: string) => {
    setIsLoading(true);
    try {
      await deleteTag(slug);
      setTags(tags.filter((tag) => tag.slug !== slug));
    } catch (error) {
      console.error("태그 삭제 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const modifyTag = async (slug: string, updatedTag: Partial<Tag>) => {
    setIsLoading(true);
    try {
      const updated = await updateTag(slug, updatedTag);
      setTags(tags.map((tag) => (tag.slug === slug ? updated : tag)));
      return updated;
    } catch (error) {
      console.error("태그 업데이트 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const findTagBySlug = (slug: string) => {
    return tags.find((tag) => tag.slug === slug);
  };

  return {
    tags,
    isLoading,
    initializeTags,
    removeTag,
    modifyTag,
    findTagBySlug,
  };
};
