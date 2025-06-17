import { CancelIcon } from '@/components/icons';
import { useLockOutsideScroll } from '@/hooks';
import { accessTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { Dispatch, RefObject, useEffect } from 'react';
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
  onAddChatting: (question: Chatting) => void;
  setChattings: Dispatch<React.SetStateAction<Chatting[]>>;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function ChatbotPanel({
  projectId,
  projectTitle,
  chattings,
  chattingBottomRef,
  onToggleChatbot,
  onAddChatting,
  setChattings,
}: ChatbotPanelProps) {
  const accessToken = useAtomValue(accessTokenAtom);

  useLockOutsideScroll();

  const { data: sessionId } = useCreateChatbotSessionId(
    accessToken as string,
    projectId,
  );
  const { mutate: sendChatbotQuestion } = useSendChatbotQuestion(
    accessToken as string,
    projectId,
    sessionId!,
  );
  const { mutate: disconnectChatbot } = useDisconnectChatbot(
    accessToken as string,
    projectId,
    sessionId!,
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
  const handleError = () => {
    onAddChatting({
      isUser: false,
      content: '마티와의 연결이 종료되었습니다. 다시 시도해주세요.',
    });
  };
  const {
    eventSourceRef,
    isConnecting,
    isTyping,
    isLoading,
    setIsLoading,
    isError,
    connect,
  } = useSSE(
    `${BASE_URL}/api/projects/${projectId}/chatbot/sessions/${sessionId}/stream`,
    handleMessage,
    handleError,
  );

  const handleCloseChatbot = () => {
    disconnectChatbot();
    onToggleChatbot();
  };
  const handleReconnect = () => {
    disconnectChatbot(undefined, {
      onSuccess: () => {
        connect();
      },
    });
  };
  const handleSendQuestion = (content: string) => {
    setIsLoading(true);
    sendChatbotQuestion(content);
  };

  useEffect(() => {
    if (sessionId && accessToken) {
      connect();
    }

    return () => {
      if (eventSourceRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        eventSourceRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, accessToken]);

  useEffect(() => {
    if (chattingBottomRef.current) {
      chattingBottomRef.current.scrollIntoView();
    }
  }, [chattingBottomRef]);
  return (
    <aside className="fixed bottom-0 [@media(min-width:600px)]:bottom-4 right-0 [@media(min-width:600px)]:right-4 w-[375px] max-h-screen [@media(min-width:376px)]:max-h-4/5 h-full z-50 bg-light-blue rounded-t-2xl rounded-b-none xs:rounded-2xl shadow-2xl border border-soft-blue overflow-hidden flex flex-col">
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
        isLoading={isLoading}
        isError={isError}
        onReconnect={handleReconnect}
        onAddChatting={onAddChatting}
        onQuestionSubmit={handleSendQuestion}
      />
    </aside>
  );
}
