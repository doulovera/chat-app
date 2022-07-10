import { getGithubUsername } from '@services/getGithubUsername';
import { UserInfo } from '@typests/user';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import type { Conversation } from '@twilio/conversations';
import { logOut } from '@services/auth';

type Store = {
  isActive: boolean;
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  logOutUser: () => void;
}

export const useUser = create(persist<Store>(
  (set) => ({
    isActive: false,
    user: null,
    setUser: async (user) => {
      const username = await getGithubUsername(user.uid);
      set((state) => ({
        ...state,
        user: { ...user, username },
        isActive: true,
      }));
    },
    logOutUser: async () => {
      await logOut();
      set((state) => ({
        ...state,
        user: null,
        isActive: false,
      }));
    },
  }),
  {
    name: 'user',
    getStorage: () => sessionStorage,
  },
));

type ConversationStore = {
  activeConversation: Conversation | null;
  setActiveConversation: (conversation: Conversation) => void;
}

export const useConversation = create<ConversationStore>(
  (set) => ({
    activeConversation: null,
    setActiveConversation: (conversation) => set((state) => ({ ...state, activeConversation: conversation })),
  }),
);
