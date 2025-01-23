import { Post, PostItem } from "../model/types"

// 게시물 조회
export const fetchPostsList = async (limit: number, skip: number): Promise<Post> => {
	const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
	return response.json();
}

// 게시물 검색
export const searchPostsList = async (searchQuery: string): Promise<Post[]> => {
	const response = await fetch(`/api/posts/search?q=${searchQuery}`);
	return response.json();
}

// 게시물 추가
export const addPost = async (newPost: Post): Promise<Post> => {
  const response = await fetch(`/api/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  
  return response.json();
};

// 게시물 업데이트
export const updatePost = async (selectedPost: PostItem): Promise<Post> => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  });
  
  return response.json();
};

// 게시물 삭제
export const deletePost = async (postId: number): Promise<Post> => {
	const response = await fetch(`/api/posts/${postId}`, {
		method: "DELETE",
	});
	
	return response.json();
};

// 태그별 게시물 가져오기
export const fetchPostsByTag = async (tag: string): Promise<Post> => {
	const response = await fetch(`/api/posts/tag/${tag}`);
	return response.json();
};
