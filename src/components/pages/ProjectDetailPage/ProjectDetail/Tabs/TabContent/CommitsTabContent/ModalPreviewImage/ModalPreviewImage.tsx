import { Modal } from '@/components/ui/Modal/Modal';
import { useBooleanState } from '@/hooks/useBooleanState';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { DisplayImageDiffType } from '@/models/pageSnapShot.model';

type Props = {
  activeModal: boolean;
  toggleActiveModal: () => void;
  setCloseModal: () => void;
  imageView?: DisplayImageDiffType;
};
export const ModalPreviewImage: FC<Props> = ({
  activeModal,
  toggleActiveModal,
  setCloseModal,
  imageView,
}) => {
  const [urlImage, setUrlImage] = useState<DisplayImageDiffType>();

  useEffect(() => {
    if (imageView) {
      setUrlImage(imageView);
    }
  }, [imageView]);

  return imageView ? (
    <div className='mb-8 flex h-full items-center justify-between text-right'>
      <Modal
        open={activeModal}
        onClose={setCloseModal}
        $isModalNotAlignCenter
        $isAllowClickOutsideToClose={true}
        widthModal='600px'
      >
        <div
          className='shadow-three mb-12 rounded-3xl bg-white px-8 py-11 shadow-2xl sm:p-[25px] lg:mb-0 lg:px-8 xl:p-[25px]'
          data-wow-delay='.15s
              '
        >
          <h2 className='mb-3 text-left text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl'>
            Preview image diff
          </h2>
          <p className='mb-5 flex justify-center gap-5 font-sans text-xl font-normal leading-normal text-blue-700 antialiased'>
            <strong>Diff: </strong>
            {imageView.diff} <strong>Match:</strong> {imageView.match}
          </p>
          <div
            className='-mx-4 flex h-[500px] flex-wrap overflow-scroll'
            style={{
              border: '1px solid #f0f0f0',
              borderRadius: '10px',
              background: '#f0f0f0',
              margin: '0px 20px',
            }}
          >
            {urlImage && (
              <Image alt='' src={imageView.imageUrl} width='500' height='500' />
            )}
          </div>
        </div>
      </Modal>
    </div>
  ) : null;
};
