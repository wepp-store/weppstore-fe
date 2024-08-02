import { PATH } from '@/shared/constants';
import { redirect } from 'next/navigation';

const DeveloperHome = () => {
  redirect(PATH.DEVELOPER.MAIN);
};

export default DeveloperHome;
