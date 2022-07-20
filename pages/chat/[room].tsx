import { useState } from 'react';
import Header from '@components/shared/Header';

import type { NextPage } from 'next';
import MessageBubble from '@components/conversation/MessageBubble';
import { PaperPlaneRight } from 'phosphor-react';

const mock = {
  uniqueName: 'toyoteros-group',
  friendlyName: 'Toyoteros Group',
  sendMessage: (text: string) => console.log(text),
  participants: 3,
  messages: [
    {
      sid: '1231231',
      author: 'Bob',
      body: 'Hello, world!',
    },
    {
      sid: '1231232',
      author: 'Alice',
      body: 'Hi, Bob!',
    },
    {
      sid: '1231233',
      author: 'doulovera',
      body: 'Hi folks!',
    },
  ],
};

const { messages, ...activeConversation } = mock;

const USER_SID = '1231233';
const ChatRoom: NextPage = () => {
  const [message, setMessage] = useState<string>('');

  return (
    <div className="h-full">
      <Header
        title={activeConversation.friendlyName}
        participantCount={activeConversation.participants}
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
        <div className="flex-1">
          {
            messages.map((message) => (
              <MessageBubble
                key={message.sid}
                isLocal={message.sid === USER_SID}
                author={message.author}
                body={message.body}
              />
            ))
          }
        </div>
        <div className="flex gap-1 h-16 pb-4">
          <input
            className="flex-1 w-full p-2 bg-gray-600 border-gray-800 border-2 rounded-xl"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={`Message in "${activeConversation.friendlyName}"`}
          />
          <button
            className="grid place-items-center aspect-square h-12 bg-primary-darker rounded-full"
            onClick={() => {
              activeConversation?.sendMessage(message);
              setMessage('');
            }}
          >
            <PaperPlaneRight size={26} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
