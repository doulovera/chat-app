import Head from 'next/head';
// import Link from 'next/link';
import { GithubLogo } from 'phosphor-react';
import { logInGithub } from '@services/auth';
// types
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>chat-app 🍕</title>
      </Head>
      <div className="max-w-sm mx-auto py-5 text-center">
        <div>
          <h1 className="text-4xl font-bold uppercase mb-2">💬chat-app 🍕</h1>
          <p>Your new way to comunicate!</p>
        </div>
        <div className="mt-24">
          <div className="mt-6">
            <button
              className="flex items-center justify-center gap-2 bg-white text-black h-10 w-64 rounded-md m-auto"
              onClick={logInGithub}
            >
              <GithubLogo size={22} />
              Sign in with Github
            </button>
          </div>
          {/* <div className="mt-24">
            <Link href="/chat">
              <a className="flex items-center justify-center h-10 w-48 m-auto bg-gray-600 rounded-md">
                Go to the App
              </a>
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
