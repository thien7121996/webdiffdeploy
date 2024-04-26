import db from '@/configs/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { projectId } = req.query;
  const projectRef = doc(db, `/projects/${projectId}`);
  const pageSnapsRef = collection(db, `/projects/${projectId}/pageSnapShot`);
  const pageSnapsSnap = await getDocs(pageSnapsRef);

  const deleteList = [deleteDoc(projectRef)];

  try {
    pageSnapsSnap.docs.forEach((doc) => {
      deleteList.push(deleteDoc(doc.ref));
    });

    await Promise.all(deleteList);
    res.status(200).send('Delete successfully');
  } catch (error) {
    res.status(400).send('Something error');
  }
}
