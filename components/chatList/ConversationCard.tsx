import NumberBadge from '@components/shared/NumberBadge';
import { getConversation } from '@services/chat';
import { getAccessToken } from '@services/getAccesstToken';
import { useConversation, useUser } from '@store';
import { useRouter } from 'next/router';
import { UsersThree } from 'phosphor-react';
import ConversationOperations from './ConversationOperations';
// types
import type { Conversation } from '@twilio/conversations';

type Props = {
  name: string,
  lastMessage: string,
  pendingMessages: number,
  roomId: string,
  isRoomAdmin: boolean,
}

export default function ConversationCard ({ name, lastMessage, pendingMessages, roomId, isRoomAdmin }: Props) {
  const hasPendingMessages = pendingMessages !== 0;
  const store = useUser();
  const { user } = store;

  const conversationStore = useConversation();
  const { setActiveConversation } = conversationStore;

  const router = useRouter();

  const handleClick = async () => {
    if (!roomId) return;

    if (!user || !user.token) return null;
    if (!roomId) return null;

    const accessToken = await getAccessToken(user.token) as string;
    const conversation = await getConversation({ roomId, accessToken });

    if (conversation) {
      setActiveConversation(conversation as Conversation);
      router.push(`/chat/${roomId}`);
    }
  };

  return (
    <div
      className="flex items-center justify-start gap-3 h-20 px-2 hover:bg-primary-darker rounded-3xl cursor-pointer group"
      onClick={handleClick}
    >
      <div className="grid place-items-center h-14 bg-gray-700 rounded-full aspect-square">
        <UsersThree size={30} />
      </div>
      <div className={`flex-1 min-w-0 ${hasPendingMessages ? 'font-bold' : ''}`}>
        <h3>{name}</h3>
        <p className="text-sm truncate opacity-50" title={lastMessage}>{lastMessage}</p>
      </div>
      <div>
        {
          hasPendingMessages && (
            <NumberBadge
              number={pendingMessages}
              important
            />
          )
        }
      </div>
      <ConversationOperations roomId={roomId} isRoomAdmin={isRoomAdmin} />
    </div>
  );
}
