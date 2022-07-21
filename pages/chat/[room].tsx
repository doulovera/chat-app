import { RefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@components/shared/Header';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { useConversation, useUser } from '@store';
import MessageList from '@components/conversation/MessageList';
import MessageInput from '@components/conversation/MessageInput';
// types
import type { NextPage } from 'next';
import type{ Message } from '@twilio/conversations';
import Head from 'next/head';

const ChatRoom: NextPage = () => {
  const router = useRouter();

  const { user } = useUser();

  const conversationStore = useConversation();
  const { activeConversation } = conversationStore;

  const [convoMessages, setConvoMessages] = useState<Message[]>([]);
  const [participantCount, setParticipantCount] = useState<number>(0);

  const containerRef = useRef(null);

  if (!activeConversation && typeof window !== 'undefined') router.push('/chat');

  useAsyncEffect(async () => {
    if (activeConversation) {
      const paginator = await activeConversation.getMessages();
      setConvoMessages(paginator.items);

      const participantCount = await activeConversation.getParticipantsCount();
      setParticipantCount(Number(participantCount));
    }
  }, []);

  useEffect(() => {
    activeConversation?.on('messageAdded', (message: Message) => {
      setConvoMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      activeConversation?.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (containerRef) {
      (containerRef as RefObject<HTMLDivElement>).current!.scrollTop = (containerRef as RefObject<HTMLDivElement>).current!.scrollHeight;
    }
  }, [convoMessages?.length]);

  return (
    <div className="min-h-full h-full">
      <Head>
        <title>{activeConversation?.friendlyName || activeConversation?.uniqueName}</title>
      </Head>
      <Header
        title={activeConversation?.friendlyName || activeConversation?.uniqueName!}
        participantCount={participantCount || 0}
        roomId={activeConversation?.uniqueName!}
        isRoomAdmin={activeConversation?.createdBy === user?.uid}
        isChat
      />
      <div
        className="flex flex-col h-full max-w-sm m-auto px-2"
        style={{
          backgroundImage: 'url(/images/sprinkle_lg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          ref={containerRef}
          className="min-h-[82vh] max-h-[82vh] px-4 flex-1 overflow-auto scrollbar scrollbar-thin scrollbar-thumb-primary-darker scrollbar-track-gray-700"
        >
          <MessageList
            messageList={convoMessages}
          />
        </div>
        <div>
          <MessageInput
            activeConversation={activeConversation}
            friendlyName={activeConversation?.friendlyName}
            uniqueName={activeConversation?.uniqueName!}
            containerRef={containerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
