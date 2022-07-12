import Head from 'next/head';
import Header from '@components/shared/Header';
import CreateOrJoinCard from '@components/chatList/CreateOrJoinCard';
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
        <div className="h-40">
          <div className="relative h-24 bg-primary-darker">
            <CreateOrJoinCard />
          </div>
        </div>
        <div className="w-4/5 min-w-[280px] max-w-md mx-auto my-4">
          <ListOfConversations />
        </div>
      </div>
    </>
  );
};

export default Chat;
