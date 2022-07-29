import Head from 'next/head';
import Header from '@components/shared/Header';
import CreateConvoCard from '@components/chatList/CreateConvoCard';
import ListOfConversations from '@components/chatList/ListOfConversations';

// types
import type { NextPage } from 'next';

const Chat: NextPage = () => {
  return (
    <>
      <Head>
        <title>Your chats 🗨</title>
      </Head>
      <Header title="chat-app" />
      <div>
        <div className="min-h-40 h-auto">
          <div className="relative h-24 bg-primary-darker">
            <CreateConvoCard />
          </div>
        </div>
        <div className="w-4/5 min-w-[280px] max-w-md mx-auto mt-14 mb-4">
          <div>
            <ListOfConversations />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
