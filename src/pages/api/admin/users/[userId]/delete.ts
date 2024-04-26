import admin from 'firebase-admin';
import db, { serviceAccountPrivate } from '@/configs/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPrivate),
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const { userId } = req.query; // Get the userId from request query params

    if (!userId) {
      res.status(400).json({ error: 'userId parameter is required' });
      return;
    }

    // Delete user from Firebase Authentication
    await admin.auth().deleteUser(userId.toString());
    const usermetaRef = doc(db, 'usermeta', userId as string);
    await deleteDoc(usermetaRef);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
