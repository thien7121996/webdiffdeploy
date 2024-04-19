import config from '@/configs/env';
import db from '@/configs/firebase';
import { CreateCommitDocsResponse } from '@/models/CreateCommitDocsType';
import axios from 'axios';
import { doc, updateDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateCommitDocsResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { uuid: userId } = req.cookies;
  const { projectId } = req.body;

  if (!userId || !projectId) {
    res.status(400).end('Bad request');
    return;
  }

  try {
    const project = { statusRun: 1 }; // cancel, running, done
    const projectDoc = doc(db, 'projects', projectId);
    updateDoc(projectDoc, {
      ...project,
    });
    const responseUrlList = await axios.post(
      `${config.queueServer.origin}/run-visual-snapshots/create-visual-page-snapshot`,
      {
        userId,
        projectId,
      }
    );

    res.status(200).json({ message: 'OK', data: responseUrlList.data.data });
  } catch (error) {
    res.status(400).end('Some thing error');
  }
}
