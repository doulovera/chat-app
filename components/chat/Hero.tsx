import { Plus, SignIn } from 'phosphor-react';
// types
import type { ReactElement } from 'react';

function HeroButton (
  { icon, label, handleClick } : { icon: ReactElement, label: string, handleClick: () => void },
) {
  return (
    <div className="grid place-items-center">
      <button
        className="grid place-items-center h-20 w-20 mb-2 text-black bg-gray-600 rounded-full"
        onClick={handleClick}
      >
        {icon}
      </button>
      <p className="text-sm">
        {label}
      </p>
    </div>
  );
}

export default function Hero () {
  return (
    <div
      className="h-40 bg-primary-darker"
      style={{
        backgroundImage: 'url(/images/sprinkle.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex items-center justify-around h-full w-3/4 mx-auto">
        <HeroButton icon={<Plus size={32} />} label="Create Conversation" handleClick={() => console.log('1')} />
        <HeroButton icon={<SignIn size={32} />} label="Join Conversation" handleClick={() => console.log('1')} />
      </div>
    </div>
  );
}
