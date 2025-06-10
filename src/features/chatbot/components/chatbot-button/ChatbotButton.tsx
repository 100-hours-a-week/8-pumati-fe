'use client';

import chatbotImg from '@/assets/images/mati-chatbot.png';
import { CancelIcon } from '@/components/icons';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Chatting as ChattingType } from '../../schemas';
import { ChatForm } from '../chat-form';
import { ChattingItem } from '../chatting-item';

type ChatbotButtonProps = {
  title: string;
  term: number;
  teamNumber: number;
};

export function ChatbotButton({ title, term, teamNumber }: ChatbotButtonProps) {
  const chattingBottomRef = useRef<HTMLDivElement>(null);

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chattings, setChattings] = useState<ChattingType[]>([
    {
      isUser: false,
      content: `안녕하세요! 마티에게 ${term}기 ${teamNumber}팀의 ${title}에 대해 궁금한 내용을 물어보세요!`,
    },
    {
      isUser: true,
      content: '어떤 기능들을 개발했어?',
    },
  ]);

  const handleToggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };
  const handleSubmitQuestion = (question: ChattingType) => {
    setChattings((prev) => [...prev, question]);
  };

  useEffect(() => {
    if (chattingBottomRef && chattingBottomRef.current) {
      chattingBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chattings, chattingBottomRef]);
  return (
    <>
      {!isChatbotOpen && (
        <button
          className="fixed bottom-6 right-6 z-20 w-12 xs:w-14 h-12 xs:h-14 rounded-full bg-light-green shadow-xl flex items-center justify-center cursor-pointer"
          onClick={handleToggleChatbot}
        >
          <Image
            src={chatbotImg}
            alt="chatbot"
            fill
            sizes="100%"
            className="object-contain"
            priority
          />
        </button>
      )}
      {isChatbotOpen && (
        <aside className="fixed bottom-0 [@media(min-width:600px)]:bottom-4 right-0 [@media(min-width:600px)]:right-4 w-[375px] max-h-4/5 h-full z-50 bg-light-blue rounded-t-2xl rounded-b-none xs:rounded-2xl shadow-2xl border border-soft-blue overflow-hidden flex flex-col">
          <p className="text-lg p-4 font-semibold text-center">{title}</p>
          <button
            className="absolute top-4 right-4  p-2 bg-soft-blue cursor-pointer rounded-lg"
            onClick={handleToggleChatbot}
          >
            <CancelIcon width={14} height={14} fill="var(--color-blue)" />
          </button>
          <ul className="flex flex-col gap-2 mt-4 py-2 overflow-y-auto grow px-4">
            {chattings.map(({ content, isUser }, index) => (
              <ChattingItem key={index} content={content} isUser={isUser} />
            ))}
            <div ref={chattingBottomRef} />
          </ul>
          <ChatForm onSubmitQuestion={handleSubmitQuestion} />
        </aside>
      )}
    </>
  );
}
