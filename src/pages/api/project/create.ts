import db from '@/configs/firebase';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data?: any;
  message: string;
  id?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name } = req.body;
  const { uuid: userId } = req.cookies;

  if (!userId && !name) {
    res.status(400).json({ message: 'Missing or empty userId or name' });
    return;
  }

  try {
    const newProject = {
      userId,
      name,
      createdAt: new Date().toISOString(),
    };

    const projectsRef = collection(db, '/projects');

    const { id } = await addDoc(projectsRef, newProject);

    const projectRef = doc(db, `/projects/${id}`);

    const projectSnap = await getDoc(projectRef);

    const project = { ...projectSnap.data(), id: projectSnap.id };

    res.status(200).json({
      message: 'Create project success',
      data: project,
    });
  } catch (e) {
    res.status(200).json({ message: 'Something went wrong' });
  }
}
