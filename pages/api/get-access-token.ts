// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { aplicationError } from '@back/services/error.service';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_API_KEY = process.env.TWILIO_API_KEY;
const TWILIO_API_SECRET = process.env.TWILIO_API_SECRET;
const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;

type Data = {
  message: string | false;
  accessToken: string | false;
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { jwt } = req.headers;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_API_KEY || !TWILIO_API_SECRET || !TWILIO_SERVICE_SID) return aplicationError(res, 'Missing Twilio environment variables');
  if (!jwt || jwt === null || typeof jwt !== 'string') return res.status(401).json({ message: 'Not authorized', accessToken: false });

  const identity = jwt.split('_')[1];

  const { AccessToken } = twilio.jwt;
  const { ChatGrant } = AccessToken;

  const accessToken = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    {
      identity,
    },
  );

  const conversationsGrant = new ChatGrant({
    serviceSid: TWILIO_SERVICE_SID,
  });

  accessToken.addGrant(conversationsGrant);

  res.status(200).json({
    message: 'Success',
    accessToken: accessToken.toJwt(),
  });
}
