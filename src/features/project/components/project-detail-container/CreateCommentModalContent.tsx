'use client';

import { ConfirmModal, ModalPortal, Textarea } from '@/components';
import { AUTH_PATH } from '@/constants';
import { accessTokenAtom } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateComment } from '../../hooks';
import { CreateComment, createCommentSchema } from '../../schemas';

type CreateCommentModalContentProps = {
  projectId: number;
  title: string;
  onClose: () => void;
};

export function CreateCommentModalContent({
  projectId,
  title,
  onClose,
}: CreateCommentModalContentProps) {
  const router = useRouter();

  const accessToken = useAtomValue(accessTokenAtom);
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

  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateComment();

  const onSubmit = (data: CreateComment) => {
    if (!accessToken) {
      router.push(AUTH_PATH.LOGIN);
      return;
    }

    createComment(
      {
        projectId,
        commentData: data,
        token: accessToken,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };
  return (
    <FormProvider {...methods}>
      <ModalPortal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ConfirmModal
            buttonText="작성"
            onClose={onClose}
            onConfirm={() => {}}
            isLoading={isCreatingComment}
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
