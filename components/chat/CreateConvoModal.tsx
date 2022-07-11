import { useState } from 'react';
import FormInput from '@components/shared/FormInput';
// types
import type { FormEvent } from 'react';

export default function CreateConvoModal () {
  const [friendlyNameValue, setFriendlyNameValue] = useState('');
  const [roomIdValue, setRoomIdValue] = useState('');

  const hashFriendlyName = (friendlyName: string) => {
    return friendlyName.toLowerCase().replace(/[^A-Za-z0-9\s-]/gm, '').replace(/\s+/g, '-');
  };

  const hashedFriendlyName = hashFriendlyName(friendlyNameValue);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
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
        {/* Convert button into a component 👇 */}
        <button
          type="submit"
          className="block w-full text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mt-12 mr-2 mb-2 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring-gray-800"
        >
          Create 💬
        </button>
      </form>
    </div>
  );
}
