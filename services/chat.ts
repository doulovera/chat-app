import { Client } from '@twilio/conversations';

type Props = {
  roomId: string,
  accessToken: string,
}

export const createConversation = async ({ roomId, accessToken }: Props) => {
  const client = new Client(accessToken);

  return new Promise((resolve) => {
    client.on('stateChanged', async (state) => {
      if (state === 'initialized') {
        let conversation;

        try {
          conversation = await client.createConversation({ uniqueName: roomId });
        } catch (error) {
          console.error(error);
        }

        conversation?.join();
        resolve(conversation);
      }
    });
  });
};

export const joinConversation = async ({ roomId, accessToken }: Props) => {
  const client = new Client(accessToken);

  return new Promise((resolve) => {
    client.on('stateChanged', async (state) => {
      if (state === 'initialized') {
        let conversation;

        try {
          conversation = await client.getConversationByUniqueName(roomId);
        } catch (error) {
          console.error(error);
        }

        resolve(conversation);
      }
    });
  });
};
