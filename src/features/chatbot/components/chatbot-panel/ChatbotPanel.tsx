import { CancelIcon } from '@/components/icons';
import { accessTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { RefObject } from 'react';
import { useCreateChatbotSessionId } from '../../hooks';
import { Chatting } from '../../schemas';
import { ChatForm } from '../chat-form';
import { ChattingItem } from '../chatting-item';

type ChatbotPanelProps = {
  projectId: string;
  projectTitle: string;
  chattings: Chatting[];
  chattingBottomRef: RefObject<HTMLDivElement | null>;
  handleToggleChatbot: () => void;
  handleSubmitQuestion: (question: Chatting) => void;
};

export function ChatbotPanel({
  projectId,
  projectTitle,
  chattings,
  chattingBottomRef,
  handleToggleChatbot,
  handleSubmitQuestion,
}: ChatbotPanelProps) {
  const accessToken = useAtomValue(accessTokenAtom);

  const { data: sessionId } = useCreateChatbotSessionId(
    accessToken as string,
    projectId,
  );
  console.log(sessionId);
  return (
    <aside className="fixed bottom-0 [@media(min-width:600px)]:bottom-4 right-0 [@media(min-width:600px)]:right-4 w-[375px] max-h-4/5 h-full z-50 bg-light-blue rounded-t-2xl rounded-b-none xs:rounded-2xl shadow-2xl border border-soft-blue overflow-hidden flex flex-col">
      <p className="text-lg p-4 font-semibold text-center">{projectTitle}</p>
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
  );
}
