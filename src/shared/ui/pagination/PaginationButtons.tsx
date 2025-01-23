import { Button } from '../button/Button';

interface PaginationButtonsProps {
  skip: number;
  limit: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const PaginationButtons = ({
  skip,
  limit,
  total,
  onPrevious,
  onNext,
}: PaginationButtonsProps) => (
  <div className='flex gap-2'>
    <Button disabled={skip === 0} onClick={onPrevious}>
      이전
    </Button>
    <Button disabled={skip + limit >= total} onClick={onNext}>
      다음
    </Button>
  </div>
);
