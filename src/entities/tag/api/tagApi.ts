import { Tag } from "../model/types";

// 태그 조회
export const fetchTagsList = async (): Promise<Tag[]> => {
	const response = await fetch("/api/posts/tags");
	return response.json();
};