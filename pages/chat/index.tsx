import Head from 'next/head';
import CreateOrJoinCard from '@components/chat/CreateOrJoinCard';
import ListOfConversations from '@components/chat/ListOfConversations';
// types
import type { NextPage } from 'next';

const Chat: NextPage = () => {
  return (
    <>
      <Head>
        <title>Your chats 🗨</title>
      </Head>
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
