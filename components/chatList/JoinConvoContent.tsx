import { useState } from 'react';
import FormInput from '@components/shared/FormInput';
// types
import type { FormEvent } from 'react';

export default function JoinConvoContent () {
  const [roomIdValue, setRoomIdValue] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!roomIdValue) return;
    console.log('Join conversation...');
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
        {/* Convert button into a component 👇 */}
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
