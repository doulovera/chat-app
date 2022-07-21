import { FormEvent, RefObject, useState } from 'react';
import { PaperPlaneRight } from 'phosphor-react';
import type { Conversation } from '@twilio/conversations';

type Props = {
  activeConversation: Conversation | null,
  friendlyName?: string | null;
  uniqueName: string;
  containerRef: RefObject<HTMLDivElement> | null;
}

export default function MessageInput ({ activeConversation, friendlyName, uniqueName, containerRef }: Props) {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');

    if (message.trim() === '') return;

    await activeConversation?.sendMessage(message);

    if (containerRef) {
      containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
    }
  };

  return (
    <form
      className="flex gap-1 h-16 pb-4"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-1 w-full p-2 bg-gray-600 border-gray-800 border-2 rounded-xl"
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder={`Message in "${friendlyName || uniqueName}"`}
      />
      <button
        className="grid place-items-center aspect-square h-12 bg-primary-darker rounded-full"
        type='submit'
      >
        <PaperPlaneRight size={26} />
      </button>
    </form>
  );
}
