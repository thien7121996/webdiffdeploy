// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '@/configs/firebase';
import { ApproveCommitPageSnapResponse } from '@/models/ApproveCommitPageSnap';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { first } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApproveCommitPageSnapResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { projectId, commitId, commitPageSnapId } = req.body;

  if (!projectId || !commitId || !commitPageSnapId) {
    res.status(400).end(`Bad request`);
    return;
  }

  try {
    const newVisual = await handleApproveCommitPageSnap(
      projectId,
      commitId,
      commitPageSnapId
    );

    res.status(200).json({
      message: 'Approve page snapshot successfully',
      data: newVisual,
    });
  } catch (error) {
    res.status(404).end(`Not Found`);
  }
}

const handleApproveCommitPageSnap = async (
  projectId: string,
  commitId: string,
  commitPageSnapId: string
) => {
  const commitPageSnapRef = doc(
    db,
    `/visualchecks/${commitId}/pagesnapshots/${commitPageSnapId}`
  );
  const commitPageSnapSnap = await getDoc(commitPageSnapRef);
  const needToBecomeReferenceUrl = commitPageSnapSnap.data()?.url;
  const needToBecomeReferencePath = commitPageSnapSnap.data()?.path;

  if (
    typeof needToBecomeReferenceUrl !== 'string' ||
    typeof needToBecomeReferencePath !== 'string'
  ) {
    return;
  }

  const projectPageSnapsRef = collection(
    db,
    `/projects/${projectId}/pageSnapShot`
  );

  const sameUrlCondition = query(
    projectPageSnapsRef,
    where('url', '==', needToBecomeReferenceUrl)
  );

  const projectPageSnapSnap = await getDocs(sameUrlCondition);

  const projectPageSnapIdList = projectPageSnapSnap.docs.map((doc) => doc.id);

  for (const projectPageSnapId of projectPageSnapIdList) {
    const projectPageSnapRef = doc(
      db,
      `/projects/${projectId}/pageSnapShot/${projectPageSnapId}`
    );
    await updateDoc(projectPageSnapRef, { path: needToBecomeReferencePath });
  }

  return {
    projectId,
    pageSnapId: first(projectPageSnapIdList) ?? '',
    url: needToBecomeReferenceUrl,
    path: needToBecomeReferencePath,
  };
};
