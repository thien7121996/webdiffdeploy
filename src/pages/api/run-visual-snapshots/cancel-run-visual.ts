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
  const { visualCheckId, projectId } = req.body;

  if (!userId || !visualCheckId) {
    res.status(400).end('Bad request');
    return;
  }

  try {
    const project = { statusRun: null }; // running, null
    const projectDoc = doc(db, 'projects', projectId);
    updateDoc(projectDoc, {
      ...project,
    });
    const commitRef = doc(db, `/visualchecks/${visualCheckId}`);
    updateDoc(commitRef, { finishAt: new Date() });
    const responseUrlList = await axios.post(
      `${config.queueServer.origin}/run-visual-snapshots/cancel-visual-page-snapshot`,
      {
        visualCheckId,
      }
    );

    res.status(200).json({ message: 'OK', data: responseUrlList.data.data });
  } catch (error) {
    res.status(400).end('Some thing error');
  }
}
