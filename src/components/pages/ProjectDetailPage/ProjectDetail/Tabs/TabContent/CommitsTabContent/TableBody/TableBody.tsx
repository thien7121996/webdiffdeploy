import { CommitType } from '@/models/GetCommitsType';
import { FC } from 'react';
import { Commit } from './Commit';
import { useApproveCommit } from './useApproveCommit.hooks';

type Props = {
  isAdmin: boolean;
  commits: CommitType[];
};

export const TableBody: FC<Props> = ({ commits, isAdmin }) => {
  const { handleApprove, isLoading } = useApproveCommit();

  return (
    <tbody>
      {commits.map((commit) => (
        <Commit
          key={commit.id}
          commit={commit}
          isAdmin={isAdmin}
          isLoading={isLoading}
          onApprove={handleApprove}
        />
      ))}
    </tbody>
  );
};
