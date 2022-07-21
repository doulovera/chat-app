import Image from 'next/image';

export default function NoConversations () {
  return (
    <div className="grid place-items-center w-full mt-12 opacity-40">
      <Image
        src="/images/conversation.png"
        alt="Two people chatting"
        height={150}
        width={150}
      />
      <h2 className="mt-10 text-lg font-bold text-center">
        Create a conversation with the button above!
      </h2>

      <p className="mt-5 text-md w-[40ch] text-center">
        And add a participant clicking on your profile inside the conversation
      </p>
    </div>
  );
}
