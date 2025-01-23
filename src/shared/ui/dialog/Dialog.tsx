import * as DialogPrimitive from '@radix-ui/react-dialog';

/**
 * Radix UI의 Dialog 컴포넌트를 기반으로 한 모달 다이얼로그
 *
 * @example
 * <Dialog>
 *   <DialogTrigger>열기</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>제목</DialogTitle>
 *     </DialogHeader>
 *     내용
 *   </DialogContent>
 * </Dialog>
 */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
