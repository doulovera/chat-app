import NumberBadge from '@components/shared/NumberBadge';
import { DotsThreeVertical, UsersThree } from 'phosphor-react';

type Props = {
  id: number,
  name: string,
  lastMessage: string,
  pendingMessages: number,
}

export default function ConversationCard ({ name, lastMessage, pendingMessages }: Props) {
  const hasPendingMessages = pendingMessages !== 0;

  return (
    <div
      className="flex items-center justify-start gap-3 h-20 px-2 hover:bg-primary-darker rounded-3xl cursor-pointer group"
      onClick={() => console.log('Send to conversation')}
    >
      <div className="grid place-items-center h-14 bg-gray-700 rounded-full aspect-square">
        <UsersThree size={30} />
      </div>
      <div className={`flex-1 min-w-0 ${hasPendingMessages ? 'font-bold' : ''}`}>
        <h3>{name}</h3>
        <p className="text-sm truncate" title={lastMessage}>{lastMessage}</p>
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
      <div className="opacity-0 group-hover:opacity-100 overflow-hidden max-w-0 group-hover:max-w-full transition-[max-width,opacity] duration-150 ease-in-out">
        <button
          className="grid place-items-center hover:bg-primary-dark rounded-full cursor-default"
          onClick={() => console.log('2')}
        >
          <DotsThreeVertical size={28} />
        </button>
      </div>
    </div>
  );
}
