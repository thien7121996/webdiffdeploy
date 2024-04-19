import { Modal } from '@/components/ui/Modal';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { useParams } from 'next/navigation';
import { FC } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedPageSnapshot?: Omit<PageSnapShotType, 'pageVisualSnapShot'>;
};

export const VisualSnapshotsModel: FC<Props> = ({
  selectedPageSnapshot,
  onClose,
  isOpen,
}) => {
  const params = useParams();

  if (!selectedPageSnapshot) {
    return null;
  }

  return (
    <Modal
      widthModal='90%'
      title={'Page visual snapshots'}
      open={isOpen}
      onClose={onClose}
    >
      <div></div>
    </Modal>
  );
};
