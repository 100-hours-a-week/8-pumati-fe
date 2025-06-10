'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Chatting, Question } from '../../schemas';
import { ChatInput } from '../chat-input';
import { DefaultQuestions } from '../default-questions';

type ChatFormProps = {
  onSubmitQuestion: (question: Chatting) => void;
};

export function ChatForm({ onSubmitQuestion }: ChatFormProps) {
  const methods = useForm<Question>({
    defaultValues: {
      question: '',
    },
  });

  return (
    <div className="p-4 border-t border-soft-blue">
      <FormProvider {...methods}>
        <DefaultQuestions addQuestion={onSubmitQuestion} />
        <ChatInput addQuestion={onSubmitQuestion} />
      </FormProvider>
    </div>
  );
}
