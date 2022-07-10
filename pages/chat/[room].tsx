import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useConversation } from '@store';

import type { Message } from '@twilio/conversations';

import type { NextPage } from 'next';
import useAsyncEffect from '@hooks/useAsyncEffect';

const ChatRoom: NextPage = () => {
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const conversationStore = useConversation();
  const { activeConversation } = conversationStore;
  const [messages, setMessages] = useState<Message[]>([]);

  if (!activeConversation && typeof window !== 'undefined') router.push('/');

  useAsyncEffect(async () => {
    if (activeConversation) {
      const paginator = await activeConversation.getMessages();
      setMessages(paginator.items);
    }
  }, []);

  useEffect(() => {
    activeConversation?.on('messageAdded', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      activeConversation?.removeAllListeners();
    };
  }, []);

  return (
    <div>
      <h2 className="my-5">{activeConversation?.uniqueName}</h2>
      <hr />
      {
        messages.map((message) => (
          <div key={message.sid}>
            <p>{message.author}</p>
            <p>{message.body}</p>
          </div>
        ))
      }
      <hr />
      <input
        className="p-2 border-gray-700 w-full border-2"
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Escribe tu mensaje aquí"
      />
      <button
        onClick={() => {
          activeConversation?.sendMessage(message);
          setMessage('');
        }}
      >send</button>
    </div>
  );
};

export default ChatRoom;
