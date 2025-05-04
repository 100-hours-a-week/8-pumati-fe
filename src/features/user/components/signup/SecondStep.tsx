'use client';

import { Button, Dropdown, TextInput } from '@/components';

type SecondStepProps = {
  onPrev: () => void;
  isTrainee: boolean;
  setIsTrainee: (isTrainee: boolean) => void;
  codeValue: string;
  isVerifying: boolean;
  isVerified: boolean;
  onCodeVerification: () => void;
};

export function SecondStep({
  onPrev,
  isTrainee,
  setIsTrainee,
  codeValue,
  isVerifying,
  isVerified,
  onCodeVerification,
}: SecondStepProps) {
  return (
    <>
      {isTrainee ? (
        <>
          <div className="relative">
            <TextInput
              label="인증코드"
              name="code"
              placeholder="인증코드를 입력해주세요."
              required
              maxLength={4}
              disabled={isVerifying || isVerified}
            />
            {!isVerified && (
              <Button
                type="button"
                size="sm"
                className="absolute top-[49px] right-[5px]"
                disabled={codeValue.length !== 4 || isVerifying || isVerified}
                isLoading={isVerifying}
                onClick={onCodeVerification}
              >
                인증하기
              </Button>
            )}
            {isVerified && (
              <p className="absolute bottom-0 text-sm text-blue">
                인증코드가 확인되었습니다.
              </p>
            )}
          </div>
          <Dropdown
            label="기수"
            name="term"
            options={[
              { label: '1기', value: 1 },
              { label: '2기', value: 2 },
            ]}
            placeholder="기수를 선택해주세요."
            required
          />
          <Dropdown
            label="팀(조)"
            name="team"
            options={[
              { label: '팀1', value: 1 },
              { label: '팀2', value: 2 },
            ]}
            placeholder="팀(조)을 선택해주세요."
            required
          />
          <Dropdown
            label="과정"
            name="course"
            options={[
              { label: '풀스택', value: 'FULL_STACK' },
              { label: '인공지능', value: 'AI' },
              { label: '클라우드', value: 'CLOUD' },
            ]}
            placeholder="과정을 선택해주세요."
            required
          />
        </>
      ) : (
        <>
          <p className="text-center mb-20 text-2xl font-semibold">
            카테부 교육생이신가요?
          </p>
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              size="full"
              onClick={() => setIsTrainee(true)}
            >
              네, 교육생이 맞아요
            </Button>
            <Button
              type="button"
              size="full"
              variant="outline"
              onClick={() => alert('회원가입 요청')}
            >
              아니요, 회원가입을 진행할게요
            </Button>
          </div>
        </>
      )}
      {isTrainee && (
        <div className="flex gap-3">
          <Button
            type="button"
            size="full"
            variant="outline"
            className="mt-3"
            onClick={onPrev}
          >
            이전
          </Button>
          <Button type="submit" size="full" className="mt-3">
            회원가입
          </Button>
        </div>
      )}
    </>
  );
}
