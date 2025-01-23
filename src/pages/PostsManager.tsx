import React from 'react';
import { usePostsQuery } from '@/features/post-management/';
import { useFilterStore, usePaginationStore } from '@/features/post-management/';
import { usePostStore } from '@/entities/post/model/store';
import {
  Button,
  Input,
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/shared/ui';
import { MessageSquare, Edit2, Trash2 } from 'lucide-react';

/**
 * PostsManager 컴포넌트는:
 *  - 필터/페이지네이션 상태를 Zustand에서 가져옴
 *  - usePostsQuery 훅으로 게시물 목록 데이터를 페칭
 *  - 로딩/에러/데이터 상태를 표시
 *  - 게시물 수정, 삭제 등의 액션 버튼 처리 (예시)
 */
const PostsManager: React.FC = () => {
  // 1. React Query: 게시물 데이터 가져오기
  const { data, isLoading, isError, error } = usePostsQuery();

  // 2. Zustand 스토어에서 필터, 페이지네이션, 게시물 액션 가져오기
  const { filters, setFilter, resetFilters } = useFilterStore((state) => ({
    filters: state,
    setFilter: state.setFilter,
    resetFilters: state.resetFilters,
  }));
  const { pagination, setPage, setLimit } = usePaginationStore((state) => ({
    pagination: state,
    setPage: state.setPage,
    setLimit: state.setLimit,
  }));
  const { selectedPost, selectPost, deletePost } = usePostStore((state) => ({
    selectedPost: state.selectedPost,
    selectPost: state.selectPost,
    deletePost: state.deletePost,
  }));

  // 3. 로딩 및 에러 처리
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 가져오는 중 오류가 발생했습니다: {error?.message}</div>;

  // 4. 데이터가 없는 경우 처리
  if (!data || data.posts.length === 0) {
    return <div>게시물이 없습니다.</div>;
  }

  // 5. 실제 렌더링
  return (
    <div className="mx-auto max-w-4xl p-4 space-y-4">
      <h1 className="text-2xl font-bold">게시물 관리자</h1>

      {/* 필터 영역 */}
      <div className="flex gap-4 mb-2">
        <Input
          placeholder="검색어"
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
        />

        {/* 정렬 기준 */}
        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            setFilter('sortBy', value as 'none' | 'id' | 'title' | 'reactions')
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">없음</SelectItem>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="title">제목</SelectItem>
            <SelectItem value="reactions">반응</SelectItem>
          </SelectContent>
        </Select>

        {/* 정렬 순서 */}
        <Select
          value={filters.sortOrder}
          onValueChange={(value) => setFilter('sortOrder', value as 'asc' | 'desc')}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="정렬 순서" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">오름차순</SelectItem>
            <SelectItem value="desc">내림차순</SelectItem>
          </SelectContent>
        </Select>

        {/* 페이지네이션 Limit */}
        <Select value={pagination.limit.toString()} onValueChange={(val) => setLimit(Number(val))}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10개</SelectItem>
            <SelectItem value="20">20개</SelectItem>
            <SelectItem value="30">30개</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => resetFilters()}>
          필터 초기화
        </Button>
      </div>

      {/* 게시물 목록 */}
      <div className="space-y-2">
        {data.posts.map((post) => (
          <div key={post.id} className="p-3 border rounded-md flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => selectPost(post)}>
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 Prev/Next */}
      <div className="flex gap-2">
        <Button
          onClick={() => setPage(Math.max(0, pagination.skip - pagination.limit))}
          disabled={pagination.skip === 0}
        >
          이전
        </Button>
        <Button
          onClick={() => setPage(pagination.skip + pagination.limit)}
          disabled={pagination.skip + pagination.limit >= data.total}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default PostsManager;
