'use client';

import chatbotImg from '@/assets/images/mati-chatbot.png';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Chatting as ChattingType } from '../../schemas';
import { ChatbotPanel } from '../chatbot-panel';

type ChatbotButtonProps = {
  title: string;
  term: number;
  teamNumber: number;
  projectId: string;
};

export function ChatbotButton({
  title,
  term,
  teamNumber,
  projectId,
}: ChatbotButtonProps) {
  const chattingBottomRef = useRef<HTMLDivElement>(null);

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chattings, setChattings] = useState<ChattingType[]>([
    {
      isUser: false,
      content: `안녕하세요! 마티에게 ${term}기 ${teamNumber}팀의\n${title}에 대해 궁금한 내용을 물어보세요!`,
    },
  ]);

  const handleToggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };
  const handleAddChatting = (question: ChattingType) => {
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
          aria-label="마티 챗봇 열기"
          aria-expanded={isChatbotOpen}
          aria-controls="chatbot-panel"
        >
          <Image
            src={chatbotImg}
            alt="chatbot"
            fill
            sizes="(max-width: 400px) 48px, 56px"
            className="object-contain"
            priority
          />
        </button>
      )}
      {isChatbotOpen && (
        <ChatbotPanel
          projectId={projectId}
          projectTitle={title}
          chattings={chattings}
          chattingBottomRef={chattingBottomRef}
          onToggleChatbot={handleToggleChatbot}
          onAddChatting={handleAddChatting}
          setChattings={setChattings}
        />
      )}
    </>
  );
}
