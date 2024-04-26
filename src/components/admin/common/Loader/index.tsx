import { FC } from 'react';

type Props = {
  height?: string;
  width?: string;
  position?: string;
  borderColor?: string;
};

const Loader: FC<Props> = ({ height, width, position, borderColor }) => {
  const heightDiv = height ?? '10';
  const weightDiv = width ?? '10';
  return (
    <div
      className={`flex items-center ${position ? position : 'justify-center'}`}
    >
      <div
        className={`h-${heightDiv} w-${weightDiv} color animate-spin rounded-full border-4 border-solid ${borderColor ? `border-${borderColor}` : 'border-primary'}  border-t-transparent`}
      ></div>
    </div>
  );
};

export default Loader;
