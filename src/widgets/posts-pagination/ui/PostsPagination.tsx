import { useQueryStore } from '@/features/post/model';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { Posts } from '@/entities/post';

export const PostsPagination = () => {
  const queryClient = useQueryClient();
  const { setLimit, setSkip } = useQueryStore();
  const aaa = queryClient.getQueryData<Posts>(['posts']) as Posts;
  console.log(aaa);
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <span>표시</span>
        <Select
          value={(aaa.limit ?? 0).toString()}
          onValueChange={(value) => setLimit(Number(value))}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='10' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='30'>30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className='flex gap-2'>
        <Button
          disabled={aaa.skip === 0}
          onClick={() => setSkip(Math.max(0, aaa.skip - aaa.limit))}
        >
          이전
        </Button>
        <Button
          disabled={aaa.skip + aaa.limit >= aaa.total}
          onClick={() => setSkip(aaa.skip + aaa.limit)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
