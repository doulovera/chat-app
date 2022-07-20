import { useEffect, useState } from 'react';
import { useUser } from '@store';
import useAsyncEffect from '@hooks/useAsyncEffect';
import NumberBadge from '@components/shared/NumberBadge';
import ConversationCard from './ConversationCard';
import { getAccessToken } from '@services/getAccesstToken';
import { listConversations } from '@services/chat';
// types
import type{ Conversation } from '@twilio/conversations';
import { useRouter } from 'next/router';

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

  return (
    <div>
      <div className="flex mb-6 text-xl font-semibold">
        <h2 className="flex-1">Conversations</h2>
        {
          true && (
            <NumberBadge number={3} />
          )
        }
      </div>
      {
        status === 'idle'
          ? (
              <p>Loading...</p>
            )
          : (
              conversationsList.length === 0
                ? (
                    '* Small smallist tutorial for creating/join conversation *'
                  )
                : conversationsList.map((convo) => (
              <ConversationCard
                key={convo.uniqueName}
                name={convo.friendlyName || convo.uniqueName!}
                lastMessage={convo.uniqueName!}
                pendingMessages={0}
                roomId={convo.uniqueName!}
              />
                ))
            )
      }
    </div>
  );
}
