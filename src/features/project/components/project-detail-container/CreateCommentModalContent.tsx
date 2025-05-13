'use client';

import { ConfirmModal, ModalPortal, Textarea } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateComment, createCommentSchema } from '../../schemas';

type CreateCommentModalContentProps = {
  title: string;
  onClose: () => void;
};

export function CreateCommentModalContent({
  title,
  onClose,
}: CreateCommentModalContentProps) {
  const methods = useForm({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(createCommentSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: CreateComment) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <ModalPortal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ConfirmModal
            buttonText="작성"
            onClose={onClose}
            onConfirm={() => {}}
          >
            <h2 className="text-lg font-semibold">후기 작성</h2>
            <Textarea
              name="content"
              placeholder={`${title}에서 어떤 경험을 하셨나요? 솔직한 후기를 들려주세요!`}
              rows={6}
              disabled={isSubmitting}
            />
          </ConfirmModal>
        </form>
      </ModalPortal>
    </FormProvider>
  );
}
