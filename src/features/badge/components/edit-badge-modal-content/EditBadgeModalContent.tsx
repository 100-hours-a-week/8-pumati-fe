'use client';

import { ConfirmModal, ModalPortal } from '@/components';
import { SpinnerIcon } from '@/components/icons';
import { AUTH_PATH } from '@/constants';
import { accessTokenAtom, authAtom } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useEditBadge } from '../../hooks';
import { EditBadge, editBadgeSchema } from '../../schemas';
import { TagList } from '../tag';

type EditBadgeModalContentProps = {
  onClose: () => void;
};

export function EditBadgeModalContent({ onClose }: EditBadgeModalContentProps) {
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditBadge>({
    defaultValues: {
      tags: [],
    },
    resolver: zodResolver(editBadgeSchema),
  });
  const tags = watch('tags');

  const accessToken = useAtomValue(accessTokenAtom);
  const authData = useAtomValue(authAtom);
  const { mutateAsync: editBadge, isPending: isEditingBadge } = useEditBadge();

  const handleToggleTag = async (tag: string) => {
    if (tags.includes(tag)) {
      const newTags = tags.filter((t: string) => t !== tag);
      setValue('tags', newTags);
      return;
    }

    if (tags.length < 5) {
      setValue('tags', [...tags, tag]);
    }
  };
  const handleBadgeEdit = handleSubmit(async (data) => {
    if (!accessToken || !authData?.teamId) {
      alert('팀 정보가 없습니다.');
      router.push(AUTH_PATH.LOGIN);
      return;
    }

    await editBadge({
      token: accessToken,
      teamId: authData.teamId,
      data,
    });
    onClose();
  });
  return (
    <ModalPortal>
      <ConfirmModal
        buttonText="변경"
        onClose={onClose}
        onConfirm={handleBadgeEdit}
        isLoading={isEditingBadge}
      >
        <h2 className="text-lg font-semibold">뱃지 변경</h2>
        {isEditingBadge ? (
          <div className="flex flex-col justify-center items-center gap-6 my-12">
            <SpinnerIcon
              width={40}
              height={40}
              fill="var(--color-blue)"
              className="animate-spin"
            />
            <p>잠시만 기다려주세요!</p>
          </div>
        ) : (
          <form className="relative flex flex-col items-center gap-2 pb-6">
            <div className="text-center">
              <p>뱃지의 스타일을 선택해주세요.</p>
            </div>
            <TagList tags={tags} onToggleTag={handleToggleTag} />
            {errors.tags ? (
              <p className="absolute -bottom-1 text-red-500 text-sm">
                {String(errors.tags.message)}
              </p>
            ) : tags.length === 5 ? (
              <p className="absolute -bottom-1 text-red-500 text-sm">
                태그는 최대 5개까지 입력할 수 있습니다.
              </p>
            ) : null}
          </form>
        )}
        <p className="text-sm text-grey">
          새로운 뱃지를 생성하면 현재 뱃지로 돌이킬 수 없습니다.
        </p>
      </ConfirmModal>
    </ModalPortal>
  );
}
