import admin from 'firebase-admin';
import db, { serviceAccountPrivate } from '@/configs/firebase';
import {
  collection,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
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
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const { userId, newPassword, rule, type } = req.body; // Get userId and newPassword from request body

    if (!userId) {
      res.status(500).json({ error: 'userId and newPassword are required' });
      return;
    }

    if (newPassword) {
      await admin.auth().updateUser(userId, {
        password: newPassword,
      });
    }
    // Update password in Firebase Authentication

    // Update user metadata in Firestore
    const userMetaCollectionRef = collection(db, 'usermeta');
    // Update password in Firebase Authentication
    const userMetaCondition = query(
      userMetaCollectionRef,
      where('userId', '==', userId)
    );

    const userMeta = await getDocs(userMetaCondition);
    // Update user metadata in Firestore
    if (rule) {
      const usermetaRef = doc(db, 'usermeta', userMeta.docs[0].id);
      await updateDoc(usermetaRef, {
        rule,
      });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
