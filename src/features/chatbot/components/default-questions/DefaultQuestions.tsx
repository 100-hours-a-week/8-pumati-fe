import { QUESTIONS } from '@/constants';
import { Dispatch } from 'react';
import { useFormContext } from 'react-hook-form';
import { Chatting, Question } from '../../schemas';

type DefaultQuestionsProps = {
  isConnecting: boolean;
  isTyping: boolean;
  setIsTyping: Dispatch<React.SetStateAction<boolean>>;
  addChatting: (question: Chatting) => void;
  sendQuestion: (content: string) => void;
};

export function DefaultQuestions({
  isConnecting,
  isTyping,
  setIsTyping,
  addChatting,
  sendQuestion,
}: DefaultQuestionsProps) {
  const { reset, handleSubmit } = useFormContext<Question>();

  const handleClickDefaultQuestion = (question: string) => {
    if (isConnecting || isTyping) return;

    setIsTyping(true);
    addChatting({
      content: question,
      isUser: true,
    });
    handleSubmit(() => {
      sendQuestion(question);
      reset();
    })();
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
