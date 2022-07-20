import { useState } from 'react';
import FormInput from '@components/shared/FormInput';
import { useConversation, useUser } from '@store';
import useModal from '@hooks/useModal';
import { getAccessToken } from '@services/getAccesstToken';
import { joinConversation } from '@services/chat';
import { useRouter } from 'next/router';
// types
import type { FormEvent } from 'react';
import type { Conversation } from '@twilio/conversations';

export default function JoinConvoContent () {
  const store = useUser();
  const { user } = store;
  const { closeModal } = useModal();

  const conversationStore = useConversation();
  const { setActiveConversation } = conversationStore;

  const [roomIdValue, setRoomIdValue] = useState('');

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!roomIdValue) return;

    if (!user || !user.token) return null;
    if (!roomIdValue) return null;

    const accessToken = await getAccessToken(user.token);
    const conversation = await joinConversation({ roomId: roomIdValue, accessToken });

    if (conversation) {
      setActiveConversation(conversation as Conversation);
      closeModal();
      router.push(`/chat/${roomIdValue}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Join Conversation</h2>
      <form className="mt-10" onSubmit={handleSubmit}>
        <FormInput
          id="roomId"
          label="Room ID"
          placeholder="toyoteros-group"
          containerClassName="mt-6"
          className="font-mono"
          value={roomIdValue}
          onChange={(event) => setRoomIdValue(event.target.value)}
        />
        <button
          type="submit"
          className="block w-full text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mt-12 mr-2 mb-2 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring-gray-800"
        >
          Join &#9992;
        </button>
      </form>
    </div>
  );
}
