import { CommitType } from '@/models/GetCommitsType';
import { DisplayImageDiffType } from '@/models/pageSnapShot.model';
import { FC } from 'react';
import { Commit } from './Commit';
import { useApproveCommit } from './useApproveCommit.hooks';

type Props = {
  isAdmin: boolean;
  commits: CommitType[];
  toggleActiveModal?: () => void;
  setImageView?: React.Dispatch<React.SetStateAction<DisplayImageDiffType>>;
};

export const TableBody: FC<Props> = ({
  commits,
  isAdmin,
  toggleActiveModal,
  setImageView,
}) => {
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
          toggleActiveModal={toggleActiveModal}
          setImageView={setImageView}
        />
      ))}
    </tbody>
  );
};
