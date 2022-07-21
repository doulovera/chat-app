import useAsyncEffect from '@hooks/useAsyncEffect';
import { getGithubUsername } from '@services/getGithubUsername';
import { useState } from 'react';

type Props = {
  isLocal?: boolean,
  author: string,
  body: string,
  createdAt: Date,
}

export default function MessageBubble ({ isLocal, author, body, createdAt }: Props) {
  const [messageAuthor, setMessageAuthor] = useState('');

  useAsyncEffect(async () => {
    const username = await getGithubUsername(author);
    setMessageAuthor(username);
  }, []);

  return (
    <div
      className={
        `h-auto w-5/6 px-4 py-2 my-4 rounded-xl ${isLocal ? 'bg-gray-900 ml-auto' : 'bg-gray-700 mr-auto'}`
      }
    >
      <p className="text-sm opacity-60">
        <span title={author}>
          {messageAuthor}
        </span>
      </p>
      <p className="mt-1 mb-3 text-base">
        {body}
      </p>
      <p className="text-xs opacity-60 text-right" title={createdAt.toDateString()}>
        {createdAt.toLocaleTimeString()}
      </p>
    </div>
  );
}
