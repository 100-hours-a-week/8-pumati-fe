import { SkeletonBox } from '@/components';

export function SubscribedProjectsFallback() {
  return (
    <ul className="flex flex-col gap-5 animate-pulse">
      {Array.from({ length: 8 }, (_, index) => (
        <li
          key={index}
          className="flex flex-col gap-2 px-4 py-3 rounded-lg bg-light-grey"
        >
          <div className="flex gap-4">
            <SkeletonBox className="aspect-square xs:aspect-[16/9] h-18 shrink-0 w-fit" />
            <div className="grow flex flex-col gap-1">
              <SkeletonBox className="h-7" />
              <SkeletonBox className="h-5" />
            </div>
          </div>
          <ul className="flex gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <SkeletonBox className="w-16 h-8 rounded-full" />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
