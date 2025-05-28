import { ArrowIcon } from '@/components/icons';
import Image from 'next/image';
import { MyData } from '../../schemas';

type InformationProps = {
  user: MyData;
};

export function Information({ user }: InformationProps) {
  const { term, teamNumber, email, name, nickname, profileImageUrl } = user;

  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-semibold">회원 정보</h2>
      <div className="flex gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src={profileImageUrl}
            alt="프로필 이미지"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-1 text-sm">
          <div className="flex items-center gap-4">
            <p className="text-base font-semibold">
              {nickname}({name})
            </p>
            <button>
              <ArrowIcon
                width={20}
                height={20}
                fill="var(--color-dark-grey)"
                className="rotate-90"
              />
            </button>
          </div>
          <p className="flex flex-wrap gap-2">
            <span className="text-dark-grey">
              판교 {term}기, {teamNumber}팀
            </span>
            <span className="text-soft-grey">|</span>
            <span className="text-dark-grey whitespace-pre-wrap break-all">
              {email}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
