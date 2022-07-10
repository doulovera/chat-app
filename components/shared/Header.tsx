import SignInButton from './SignInButton';

export default function Header () {
  return (
    <div className="flex items-center justify-between max-w-sm mx-auto">
      <div />
      <h1>chat-app</h1>
      <div>
        <SignInButton />
      </div>
    </div>
  );
}
