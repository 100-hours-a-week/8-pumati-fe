'use client';

import { ArrowIcon } from '@/components/icons';
import PauseIcon from '@/components/icons/PauseIcon';
import { cn } from '@/utils/style';
import { useFormContext } from 'react-hook-form';
import { Chatting, Question } from '../../schemas';

type ChatInputProps = {
  isConnecting: boolean;
  isTyping: boolean;
  isLoading: boolean;
  addChatting: (question: Chatting) => void;
  sendQuestion: (content: string) => void;
};

export function ChatInput({
  isConnecting,
  isTyping,
  isLoading,
  addChatting,
  sendQuestion,
}: ChatInputProps) {
  const isTypingOrLoading = isTyping || isLoading;

  const { register, handleSubmit, reset } = useFormContext<Question>();

  const onSubmit = ({ question }: Question) => {
    if (!question.trim()) return;

    addChatting({
      content: question,
      isUser: true,
    });
    sendQuestion(question);
    reset();
  };
  return (
    <form className="relative mt-3" onSubmit={handleSubmit(onSubmit)}>
      <input
        id="question"
        {...register('question')}
        disabled={isConnecting || isTypingOrLoading}
        maxLength={50}
        placeholder="무엇이든 물어보세요."
        className="w-full pl-4 pr-10 py-2 bg-white placeholder:text-grey placeholder:text-sm rounded-md outline-none border border-soft-grey focus:border-transparent focus:ring-2 focus:ring-blue focus:ring-offset-0 disabled:bg-blue-white"
      />
      <button
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full text-white transition-colors duration-150',
          isTypingOrLoading
            ? 'border-2 border-blue bg-white cursor-not-allowed'
            : 'bg-blue cursor-pointer',
        )}
        aria-label={isTypingOrLoading ? '마티 답변 생성 중' : '전송하기'}
      >
        {isTypingOrLoading ? (
          <PauseIcon width={18} height={18} fill="blue" />
        ) : (
          <ArrowIcon width={16} height={16} fill="white" />
        )}
      </button>
    </form>
  );
}
