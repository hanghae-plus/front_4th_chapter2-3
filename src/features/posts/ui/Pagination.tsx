import { useAtom } from 'jotai';
import { postsAtom } from '../model/store';
import { Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui';

export const Pagination = () => {
  const [{ pagination }, setPosts] = useAtom(postsAtom);
  const { skip, limit, total } = pagination;

  const handleLimitChange = (value: string) => {
    setPosts((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        limit: Number(value),
        skip: 0,
      },
    }));
  };

  const handlePrevPage = () => {
    setPosts((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        skip: Math.max(0, prev.pagination.skip - prev.pagination.limit),
      },
    }));
  };

  const handleNextPage = () => {
    setPosts((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        skip: prev.pagination.skip + prev.pagination.limit,
      },
    }));
  };

  return (
    <div className='flex justify-between items-center mt-4'>
      <div className='flex items-center gap-2'>
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className='w-[100px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10개</SelectItem>
            <SelectItem value='20'>20개</SelectItem>
            <SelectItem value='30'>30개</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className='flex gap-2'>
        <Button variant='outline' onClick={handlePrevPage} disabled={skip === 0}>
          이전
        </Button>
        <Button variant='outline' onClick={handleNextPage} disabled={skip + limit >= total}>
          다음
        </Button>
      </div>
    </div>
  );
};
