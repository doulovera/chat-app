import { useState } from 'react';
import { useRouter } from 'next/router';
import { useConversation, useUser } from '@store';
import { getAccessToken } from '@services/getAccesstToken';
import { createConversation } from '@services/chat';
import useModal from '@hooks/useModal';
import FormInput from '@components/shared/FormInput';
import Button from '@components/shared/Button';
// types
import type { FormEvent } from 'react';
import type { Conversation } from '@twilio/conversations';

export default function CreateConvoContent () {
  const store = useUser();
  const { user } = store;
  const { closeModal } = useModal();

  const conversationStore = useConversation();
  const { setActiveConversation } = conversationStore;

  const [friendlyNameValue, setFriendlyNameValue] = useState('');
  const [roomIdValue, setRoomIdValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const hashFriendlyName = (friendlyName: string) => {
    return friendlyName.toLowerCase().replace(/[^A-Za-z0-9\s-]/gm, '').replace(/\s+/g, '-');
  };

  const hashedFriendlyName = hashFriendlyName(friendlyNameValue);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (!roomIdValue) return;

    if (!user || !user.token) return null;
    if (!roomIdValue) return null;

    const accessToken = await getAccessToken(user.token);
    const conversation = await createConversation({ roomId: roomIdValue, accessToken, friendlyName: friendlyNameValue });

    if (conversation) {
      setActiveConversation(conversation as Conversation);
      router.push(`/chat/${roomIdValue}`);
      closeModal();
      setIsLoading(false);
      setFriendlyNameValue('');
      setRoomIdValue('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Create Conversation</h2>
      <form className="mt-10" onSubmit={handleSubmit}>
        <FormInput
          id="friendlyName"
          label="Friendly Name"
          placeholder="Toyoteros group"
          value={friendlyNameValue}
          onChange={(event) => setFriendlyNameValue(event.target.value)}
        />

        <FormInput
          id="roomId"
          label="Room ID"
          placeholder="toyoteros-group"
          containerClassName="mt-6"
          className="font-mono"
          value={roomIdValue}
          onChange={(event) => setRoomIdValue(hashFriendlyName(event.target.value))}
        />

        <p className="h-5 text-xs mb-6">
          {
            hashedFriendlyName
              ? <span className="cursor-pointer hover:underline" onClick={() => setRoomIdValue(hashedFriendlyName)}>
                {`Suggestion: ${hashedFriendlyName}`}
              </span>
              : 'The room ID could be different as the friendly name'
          }
        </p>

        <div className="mt-12 mb-2">
          <Button type="submit" isLoading={isLoading}>
            Create 💬
          </Button>
        </div>
      </form>
    </div>
  );
}
