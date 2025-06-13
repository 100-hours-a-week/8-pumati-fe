'use client';

import { Button } from '@/components';
import { FormProvider, useForm } from 'react-hook-form';
import { Chatting, Question } from '../../schemas';
import { ChatInput } from '../chat-input';
import { DefaultQuestions } from '../default-questions';

type ChatFormProps = {
  isConnecting: boolean;
  isTyping: boolean;
  isLoading: boolean;
  isError: boolean;
  onReconnect: () => void;
  onAddChatting: (question: Chatting) => void;
  onQuestionSubmit: (content: string) => void;
};

export function ChatForm({
  isConnecting,
  isTyping,
  isLoading,
  isError,
  onReconnect,
  onAddChatting,
  onQuestionSubmit,
}: ChatFormProps) {
  const methods = useForm<Question>({
    defaultValues: {
      question: '',
    },
  });

  return (
    <div className="p-4 border-t border-soft-blue">
      {isError ? (
        <div className="mt-3">
          <Button type="button" variant="destructive" onClick={onReconnect}>
            마티 다시 불러오기
          </Button>
        </div>
      ) : (
        <FormProvider {...methods}>
          <DefaultQuestions
            isConnecting={isConnecting}
            isTyping={isTyping}
            isLoading={isLoading}
            addChatting={onAddChatting}
            sendQuestion={onQuestionSubmit}
          />
          <ChatInput
            isConnecting={isConnecting}
            isTyping={isTyping}
            isLoading={isLoading}
            addChatting={onAddChatting}
            sendQuestion={onQuestionSubmit}
          />
        </FormProvider>
      )}
    </div>
  );
}
