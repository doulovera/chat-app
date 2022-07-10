import { NextApiResponse } from 'next';

export const aplicationError = (response: NextApiResponse, message: string) => {
  response.status(400).json({ message });
  throw new Error(message);
};
