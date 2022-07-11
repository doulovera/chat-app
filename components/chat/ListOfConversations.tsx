import NumberBadge from '@components/shared/NumberBadge';
import ConversationCard from './ConversationCard';

const mock = [
  {
    id: 1,
    name: 'Nombre convo',
    lastMessage: 'Last message',
    pendingMessages: 1,
  },
  {
    id: 2,
    name: 'Nombre convo',
    lastMessage: 'Last message',
    pendingMessages: 0,
  },
  {
    id: 3,
    name: 'Nombre convo',
    lastMessage: 'Tengo que maquetar + preparar unas cosas para la próxima semana y no tuve mejor idea que tomarme un birra antes de comer y ahora estoy medio ebria mirando el Visual Studio Code así',
    pendingMessages: 2,
  },
];

export default function ListOfConversations () {
  const conversations = mock;
  return (
    <div>
      <div className="flex justify-between mb-6 text-xl font-semibold">
        <h2>Conversations</h2>
        {
          true && (
            <NumberBadge number={3} />
          )
        }
      </div>
      {
        conversations.length === 0
          ? (
              '* Small smallist tutorial for creating/join conversation *'
            )
          : conversations.map((convo) => (
            <ConversationCard key={convo.id} {...convo} />
          ))
      }
    </div>
  );
}
