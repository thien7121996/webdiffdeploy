import db, { serviceAccountPrivate } from '@/configs/firebase';

import { collection, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPrivate),
  });
}
type UserAuth = {
  uid: string;
  email: string;
  emailVerified: boolean;
  disabled: boolean;
  metadata: any;
  passwordHash: string;
  passwordSalt: string;
  tokensValidAfterTime: string;
  providerData: [
    {
      uid: string;
      email: string;
      providerId: string;
    },
  ];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const usersRef = collection(db, '/usermeta');
  const usersSnap = await getDocs(usersRef);

  const users = await admin.auth().listUsers(); // Fetch all users
  const userData = users.users.map((userRecord) => userRecord.toJSON());
  const usersMeta = usersSnap.docs.map((userSnap) => {
    const snap = userSnap.data();
    return snap;
  });
  const mergedData = userData.map((user: any) => {
    const meta = usersMeta.find((meta) => meta.userid === user.uid);
    return { ...user, ...meta };
  });
  res
    .status(200)
    .json({ message: 'Get project list successfully', data: mergedData });
}
