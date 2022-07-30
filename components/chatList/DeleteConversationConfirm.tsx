import Button from '@components/shared/Button';
import { getConversation } from '@services/chat';
import { getAccessToken } from '@services/getAccesstToken';
import { useUser } from '@store';
// types
import type { Conversation } from '@twilio/conversations';
import { useState } from 'react';

type Props = {
  roomId: string;
  closeModal: () => void;
}

export default function DeleteConversationConfirm ({ roomId, closeModal }: Props) {
  const store = useUser();
  const { user } = store;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    if (!user || !user?.token) return null;
    const accessToken = await getAccessToken(user.token) as string;
    const conversation = await getConversation({ roomId, accessToken }) as Conversation;
    const isRoomAdmin = conversation?.createdBy === user?.uid;

    if (conversation) {
      if (!isRoomAdmin) return alert('You are not the admin of this conversation');
      await conversation.delete();
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Are you sure?</h2>
      <div className="mt-8">
        <Button color="danger" onClick={handleDelete} isLoading={isLoading}>
          Delete
        </Button>
        <div className="my-4" />
        <Button onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
