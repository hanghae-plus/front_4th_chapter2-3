import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Reaction } from '@/entities/reaction';

interface ReactionStatusProps {
  reactions?: Reaction;
}

const ReactionStatus = ({ reactions }: ReactionStatusProps) => (
  <div className='flex items-center gap-2'>
    <ThumbsUp className='w-4 h-4' />
    <span>{reactions?.likes || 0}</span>
    <ThumbsDown className='w-4 h-4' />
    <span>{reactions?.dislikes || 0}</span>
  </div>
);

export default ReactionStatus;
