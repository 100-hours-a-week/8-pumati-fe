import { CommentItem as CommentItemType } from '../../schemas';
import { CommentItem } from './CommentItem';

type CommentListProps = {
  comments: CommentItemType[];
};

export function CommentList({ comments }: CommentListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
