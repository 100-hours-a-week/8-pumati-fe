import { QUESTIONS } from '@/constants';
import { useFormContext } from 'react-hook-form';
import { Chatting, Question } from '../../schemas';

type DefaultQuestionsProps = {
  addQuestion: (question: Chatting) => void;
};

export function DefaultQuestions({ addQuestion }: DefaultQuestionsProps) {
  const { reset } = useFormContext<Question>();

  const handleClickDefaultQuestion = (question: string) => {
    reset();
    addQuestion({
      content: question,
      isUser: true,
    });
  };
  return (
    <ul className="flex gap-2 w-full overflow-x-auto">
      {QUESTIONS.map((question) => (
        <li
          key={question}
          className="flex items-center px-3 py-1 text-sm text-dark-grey bg-soft-blue border border-soft-blue rounded-full cursor-pointer transition-all duration-100 hover:brightness-95 whitespace-nowrap"
          onClick={() => handleClickDefaultQuestion(question)}
        >
          <p>{question}</p>
        </li>
      ))}
    </ul>
  );
}
