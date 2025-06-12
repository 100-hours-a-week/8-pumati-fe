'use client';

import { Dispatch } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Chatting, Question } from '../../schemas';
import { ChatInput } from '../chat-input';
import { DefaultQuestions } from '../default-questions';

type ChatFormProps = {
  isConnecting: boolean;
  isTyping: boolean;
  setIsTyping: Dispatch<React.SetStateAction<boolean>>;
  onSubmitQuestion: (question: Chatting) => void;
  onQuestionSubmit: (content: string) => void;
};

export function ChatForm({
  isConnecting,
  isTyping,
  setIsTyping,
  onSubmitQuestion,
  onQuestionSubmit,
}: ChatFormProps) {
  const methods = useForm<Question>({
    defaultValues: {
      question: '',
    },
  });

  return (
    <div className="p-4 border-t border-soft-blue">
      <FormProvider {...methods}>
        <DefaultQuestions
          isConnecting={isConnecting}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          addQuestion={onSubmitQuestion}
          sendQuestion={onQuestionSubmit}
        />
        <ChatInput
          isConnecting={isConnecting}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          addQuestion={onSubmitQuestion}
          sendQuestion={onQuestionSubmit}
        />
      </FormProvider>
    </div>
  );
}
