import { SubscribedProjects } from '@/features/subscribe/components';

export default function SubscriptionPage() {
  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-[25rem]">
        <h1 className="text-xl font-semibold mt-9 mb-4">
          구독 프로젝트 둘러보기
        </h1>
        <SubscribedProjects />
      </div>
    </section>
  );
}
