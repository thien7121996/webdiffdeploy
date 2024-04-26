import db, { serviceAccountPrivate } from '@/configs/firebase';
import admin from 'firebase-admin';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data?: any;
  message: string;
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPrivate),
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { token } = req.body;

  try {
    const { userId } = req.query;
    if (!userId) {
      res
        .status(400)
        .json({ message: 'userId parameter is required' + userId });
      return;
    }
    const userMetaCollectionRef = collection(db, 'usermeta');

    const userMetaCondition = query(
      userMetaCollectionRef,
      where('userId', '==', userId)
    );

    const userMeta = await getDocs(userMetaCondition);

    const userAuth = await admin.auth().getUser(userId.toString());
    if (!userAuth) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const userData = userAuth.toJSON();

    const userInfoData = {
      ...userData,
      ...userMeta.docs[0].data(),
    };
    // Token is valid, proceed with your logic
    return res
      .status(200)
      .json({ message: 'Token is valid', data: userInfoData });
  } catch (error) {
    // Handle error if token verification fails
    return res.status(401).json({ message: 'Invalid token', data: token });
  }
}
