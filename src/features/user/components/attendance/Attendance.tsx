'use client';

import { Button } from '@/components';

export function Attendance() {
  const handleAttendance = () => {
    alert('출석 체크');
  };
  return (
    <article className="flex flex-col items-center justify-center gap-4 p-8 my-10 bg-blue-white">
      <h2 className="text-lg font-semibold">오늘의 운세</h2>
      <p className="text-center mb-4">
        하루 한 번, 출석 체크하고 <br /> 개발자의 운세도 받아가세요!
      </p>
      <Button size="md" onClick={handleAttendance}>
        출석 체크
      </Button>
    </article>
  );
}
