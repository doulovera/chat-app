import Button from '@components/shared/Button';
import { getConversation } from '@services/chat';
import { getAccessToken } from '@services/getAccesstToken';
import { useUser } from '@store';
// types
import type { Conversation } from '@twilio/conversations';

export default function DeleteConversationConfirm ({ roomId }: { roomId: string }) {
  const store = useUser();
  const { user } = store;

  const handleDelete = async () => {
    if (!user || !user?.token) return null;
    const accessToken = await getAccessToken(user.token) as string;
    const conversation = await getConversation({ roomId, accessToken }) as Conversation;

    if (conversation) {
      // validar si el usuario es el creador
      await conversation.delete();
      // cerrar modal
    }
  };

  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Are you sure?</h2>
      <div className="mt-8">
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
        <div className="my-4" />
        <Button>
          Cancel
        </Button>
      </div>
    </div>
  );
}
