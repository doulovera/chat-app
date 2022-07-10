import { FormEvent, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { getAccessToken } from '@services/getAccesstToken';
import { useUser, useConversation } from '@store';
import { createConversation, joinConversation } from '@services/chat';
import { useRouter } from 'next/router';

import type { Conversation } from '@twilio/conversations';

const Home: NextPage = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const router = useRouter();

  const store = useUser();
  const { user } = store;

  const conversationStore = useConversation();
  const { setActiveConversation } = conversationStore;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!user || !user.token) return null;
    if (!roomId) return null;

    const accessToken = await getAccessToken(user.token);
    const conversation = await createConversation({ roomId, accessToken });

    if (conversation) {
      setActiveConversation(conversation as Conversation);
      router.push(`/chat/${roomId}`);
    }
  };

  const handleGetIn = async (event: FormEvent) => {
    event.preventDefault();

    if (!user || !user.token) return null;
    if (!roomId) return null;

    const accessToken = await getAccessToken(user.token);
    const conversation = await joinConversation({ roomId, accessToken });

    if (conversation) {
      setActiveConversation(conversation as Conversation);
      router.push(`/chat/${roomId}`);
    }
  };

  return (
    <>
      <Head>
        <title>chat-room App 🍕</title>
      </Head>
      <div className="max-w-sm mx-auto py-5">
        <form className="mt-6" onSubmit={handleSubmit}>
          <h1 className="text-center">¡Crea a una sala!</h1>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              onChange={(event) => setRoomId(event.target.value)}
            />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
            </button>
          </div>
        </form>
        <hr />
        <form className="mt-6" onSubmit={handleGetIn}>
          <h1 className="text-center">Entra a una sala!</h1>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              onChange={(event) => setRoomId(event.target.value)}
            />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
            </button>
          </div>
        </form>

      </div>
    </>
  );
};

export default Home;
