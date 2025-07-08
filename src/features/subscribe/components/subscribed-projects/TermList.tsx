import { cn } from '@/utils/style';
import { Term, TERM_OPTIONS } from './SubscriptionProjects';

type TermListProps = {
  selectedTerm: Term;
  onTermClick: (term: Term) => void;
};

export function TermList({ selectedTerm, onTermClick }: TermListProps) {
  return (
    <ul className="flex gap-2 overflow-x-auto max-w-full">
      {TERM_OPTIONS.map((term) => (
        <li
          key={term}
          className={cn(
            'px-3 py-1 rounded-lg bg-soft-blue text-blue cursor-pointer transition-colors duration-150',
            selectedTerm === term && 'bg-blue text-white',
          )}
          onClick={() => onTermClick(term)}
        >
          {term}
        </li>
      ))}
    </ul>
  );
}
