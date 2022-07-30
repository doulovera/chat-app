import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@store';
import useAsyncEffect from '@hooks/useAsyncEffect';
import NoConversations from './NoConversations';
import ConversationCard from './ConversationCard';
import { getAccessToken } from '@services/getAccesstToken';
import { listConversations } from '@services/chat';
// types
import type{ Conversation } from '@twilio/conversations';
import Loading from '@components/shared/Loading';

export default function ListOfConversations () {
  const store = useUser();
  const { user } = store;

  const router = useRouter();

  const [status, setStatus] = useState<'idle' | 'fulfilled'>('idle');
  const [conversationsList, setConversationsList] = useState<Conversation[]>([]);

  // @ts-ignore
  useEffect(() => {
    if (!user && status === 'idle') return () => router.push('/');
  }, []);

  useAsyncEffect(async () => {
    if (user && user.token) {
      const accessToken = await getAccessToken(user.token);
      const conversations = await listConversations({ accessToken });
      setStatus('fulfilled');
      setConversationsList(conversations as Conversation[]);
    }
  }, []);

  if (status === 'idle') {
    return <Loading className="w-full h-40" iconSize={44} />;
  };

  if (conversationsList?.length === 0) return <NoConversations />;

  return (
    <>
      {
        conversationsList.map((convo) => (
          <ConversationCard
            key={convo.uniqueName}
            name={convo.friendlyName || convo.uniqueName!}
            lastMessage={convo.uniqueName!}
            pendingMessages={0}
            roomId={convo.uniqueName!}
          />
        ))
      }
    </>
  );
}
