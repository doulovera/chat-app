type Props = {
  isLocal?: boolean,
  author: string,
  body: string,
}

export default function MessageBubble ({ isLocal, author, body }: Props) {
  return (
    <div
      className={
        `h-auto w-5/6 p-4 my-4 rounded-xl ${isLocal ? 'bg-gray-900 ml-auto' : 'bg-gray-700 mr-auto'}`
      }
    >
      <p className="text-base">{body}</p>
      <p className="text-xs opacity-60">{author}</p>
    </div>
  );
}
