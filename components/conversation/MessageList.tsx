import { useUser } from '@store';
import MessageBubble from './MessageBubble';
// types
import type { Message } from '@twilio/conversations';

type Props = {
  messageList: Message[];
}

export default function MessageList ({ messageList }: Props) {
  const userStore = useUser();
  const { user } = userStore;

  return (
    <>
      {
        messageList.map((message) => (
          <MessageBubble
            key={message.sid}
            isLocal={message.author === user?.uid}
            author={message.author!}
            body={message.body!}
            createdAt={message.dateCreated!}
          />
        ))
      }
    </>
  );
}
