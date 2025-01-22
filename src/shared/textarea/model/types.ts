// 텍스트 영역 컴포넌트
export interface TextareaProps {
  rows?: number;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;  // onChange 명확화
}