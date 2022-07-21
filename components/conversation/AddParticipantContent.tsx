import { useState } from 'react';
import FormInput from '@components/shared/FormInput';
import { useUser } from '@store';
import { getAccessToken } from '@services/getAccesstToken';
import { addParticipant } from '@services/chat';
// types
import type { FormEvent } from 'react';
import useModal from '@hooks/useModal';

export default function AddParticipantContent ({ roomId }: { roomId: string }) {
  const store = useUser();
  const { user } = store;
  const { closeModal } = useModal();

  const [participantId, setParticipantId] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!participantId) return;

    if (!user || !user.token) return null;
    if (!participantId) return null;

    const accessToken = await getAccessToken(user.token);
    await addParticipant({ roomId, accessToken, participantId });
    closeModal();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Add Participant</h2>
      <form className="mt-10" onSubmit={handleSubmit}>
        <FormInput
          id="participantId"
          label="Participant ID (below the Sign Out button)"
          placeholder="000000"
          value={participantId}
          onChange={(event) => setParticipantId(event.target.value)}
        />
        <button
          type="submit"
          className="block w-full text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mt-12 mr-2 mb-2 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring-gray-800"
        >
          Add user 🗣
        </button>
      </form>
    </div>
  );
}
