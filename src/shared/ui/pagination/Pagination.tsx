import { LimitSelect } from './LimitSelect';
import { PaginationButtons } from './PaginationButtons';

/**
 * 페이지네이션 컴포넌트
 *
 * @param skip - 현재 건너뛴 항목 수
 * @param limit - 페이지당 항목 수
 * @param total - 전체 항목 수
 * @param onSkipChange - 건너뛸 항목 수 변경 핸들러
 * @param onLimitChange - 페이지당 항목 수 변경 핸들러
 *
 * @example
 * <Pagination
 *   skip={0}
 *   limit={10}
 *   total={100}
 *   onSkipChange={(skip) => setSkip(skip)}
 *   onLimitChange={(limit) => setLimit(limit)}
 * />
 */
interface PaginationProps {
  skip: number;
  limit: number;
  total: number;
  onSkipChange: (skip: number) => void;
  onLimitChange: (limit: number) => void;
}

export const Pagination = ({
  skip,
  limit,
  total,
  onSkipChange,
  onLimitChange,
}: PaginationProps) => (
  <div className='flex justify-between items-center'>
    <LimitSelect value={limit} onChange={onLimitChange} />
    <PaginationButtons
      skip={skip}
      limit={limit}
      total={total}
      onPrevious={() => onSkipChange(Math.max(0, skip - limit))}
      onNext={() => onSkipChange(skip + limit)}
    />
  </div>
);
