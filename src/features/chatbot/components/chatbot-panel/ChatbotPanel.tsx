import { CancelIcon } from '@/components/icons';
import { accessTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { Dispatch, RefObject, useEffect, useState } from 'react';
import {
  useCreateChatbotSessionId,
  useDisconnectChatbot,
  useSendChatbotQuestion,
  useSSE,
} from '../../hooks';
import { Chatting } from '../../schemas';
import { ChatForm } from '../chat-form';
import { ChattingItem } from '../chatting-item';

type ChatbotPanelProps = {
  projectId: string;
  projectTitle: string;
  chattings: Chatting[];
  chattingBottomRef: RefObject<HTMLDivElement | null>;
  onToggleChatbot: () => void;
  onSubmitQuestion: (question: Chatting) => void;
  setChattings: Dispatch<React.SetStateAction<Chatting[]>>;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function ChatbotPanel({
  projectId,
  projectTitle,
  chattings,
  chattingBottomRef,
  onToggleChatbot,
  onSubmitQuestion,
  setChattings,
}: ChatbotPanelProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const accessToken = useAtomValue(accessTokenAtom);

  const { data: sessionId } = useCreateChatbotSessionId(
    accessToken as string,
    projectId,
  );
  const { mutate: sendChatbotQuestion } = useSendChatbotQuestion(
    accessToken as string,
    projectId,
    sessionId,
  );
  const { mutate: disconnectChatbot } = useDisconnectChatbot(
    accessToken as string,
    projectId,
    sessionId,
  );

  const handleMessage = (message: string) => {
    setChattings((prev) => {
      const lastChat = prev[prev.length - 1];
      const newMessage = message === '' ? ' ' : message.replace(/\\n/g, '\n');

      if (lastChat && !lastChat.isUser) {
        return [
          ...prev.slice(0, -1),
          { ...lastChat, content: lastChat.content + newMessage },
        ];
      }

      return [...prev, { isUser: false, content: newMessage }];
    });
  };
  const { eventSourceRef, connect } = useSSE(
    `${BASE_URL}/api/projects/${projectId}/chatbot/sessions/${sessionId}/stream`,
    handleMessage,
    setIsConnecting,
    setIsTyping,
  );

  const handleCloseChatbot = () => {
    disconnectChatbot();
    onToggleChatbot();
  };

  useEffect(() => {
    if (sessionId && accessToken) {
      connect();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [sessionId, accessToken]);
  return (
    <aside className="fixed bottom-0 [@media(min-width:600px)]:bottom-4 right-0 [@media(min-width:600px)]:right-4 w-[375px] max-h-4/5 h-full z-50 bg-light-blue rounded-t-2xl rounded-b-none xs:rounded-2xl shadow-2xl border border-soft-blue overflow-hidden flex flex-col">
      <p className="text-lg p-4 font-semibold text-center">{projectTitle}</p>
      <button
        className="absolute top-4 right-4  p-2 bg-soft-blue cursor-pointer rounded-lg"
        onClick={handleCloseChatbot}
      >
        <CancelIcon width={14} height={14} fill="var(--color-blue)" />
      </button>
      <ul className="flex flex-col gap-2 mt-4 py-2 overflow-y-auto grow px-4">
        {chattings.map(({ content, isUser }, index) => (
          <ChattingItem key={index} content={content} isUser={isUser} />
        ))}
        <div ref={chattingBottomRef} />
      </ul>
      <ChatForm
        isConnecting={isConnecting}
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        onSubmitQuestion={onSubmitQuestion}
        onQuestionSubmit={sendChatbotQuestion}
      />
    </aside>
  );
}
