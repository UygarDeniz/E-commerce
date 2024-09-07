import { ImSpinner8 } from 'react-icons/im';

export default function Loading() {
  return (
    <div className='flex justify-center items-center w-full'>
      <ImSpinner8 className='animate-spin text-6xl text-red-500' />
    </div>
  );
}
