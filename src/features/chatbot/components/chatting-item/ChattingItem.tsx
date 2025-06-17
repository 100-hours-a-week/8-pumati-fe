import chatbotImg from '@/assets/images/mati-chatbot.png';
import { cn } from '@/utils/style';
import Image from 'next/image';

type ChattingItemProps = {
  content: string;
  isUser: boolean;
};

export function ChattingItem({ content, isUser }: ChattingItemProps) {
  return (
    <li className="flex flex-col gap-2 whitespace-pre-wrap break-all">
      {!isUser && (
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-full bg-light-green">
            <Image
              src={chatbotImg}
              alt="chatbot"
              fill
              sizes="100%"
              className="object-contain"
            />
          </div>
          <p className="font-semibold text-sm">마티</p>
        </div>
      )}
      <pre
        className={cn(
          'text-sm px-3 py-2 bg-white rounded-xl max-w-4/5 whitespace-pre-wrap break-words',
          isUser && 'self-end',
        )}
      >
        {content}
      </pre>
    </li>
  );
}
