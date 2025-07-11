'use client';

import { ProfileImage } from '@/components';
import { NavArrowIcon } from '@/components/icons';
import { COURSE, USER_PATH } from '@/constants';
import { authAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';

export function Information() {
  const router = useRouter();
  const authData = useAtomValue(authAtom);

  if (!authData) {
    return null;
  }

  const { term, teamNumber, email, name, nickname, profileImageUrl, course } =
    authData;

  const handleEditClick = () => {
    router.push(USER_PATH.MY_PAGE_EDIT);
  };
  return (
    <section className="flex flex-col gap-4 w-full mb-12">
      <h2 className="text-lg font-semibold">회원 정보</h2>
      <div className="flex gap-4">
        <ProfileImage
          src={profileImageUrl}
          alt="프로필 이미지"
          size="lg"
          priority
        />
        <div className="flex flex-col justify-center gap-1 text-sm">
          <div className="flex items-center gap-4">
            <p className="text-base font-semibold">
              {nickname}({name})/
              <span>{course ? COURSE[course] : '외부인'}</span>
            </p>
            <button
              onClick={handleEditClick}
              className="cursor-pointer"
              aria-label="회원 정보 수정"
            >
              <NavArrowIcon
                width={20}
                height={20}
                fill="var(--color-dark-grey)"
                className="rotate-90"
              />
            </button>
          </div>
          <p className="flex flex-wrap gap-2">
            {course && (
              <>
                <span className="text-dark-grey">
                  판교 {term}기, {teamNumber}팀
                </span>
                <span className="text-soft-grey">|</span>
              </>
            )}
            <span className="text-dark-grey whitespace-pre-wrap break-all">
              {email}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
