import { PATH } from '@/_constants';
import { Modal } from '@/components/modal';
import { Popover } from '@/components/popover';
import { UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React from 'react';

const AccountPopover = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = React.useState<boolean>(false);

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  const handleLogout = async () => {
    try {
      // logout();
      router.replace(PATH.AUTH.SIGN_IN);
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    handleClosePopover();
    router.push(path);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpenPopover((prev) => !prev)}>
        <UserRound />
      </button>
      <Popover
        open={openPopover}
        onClose={handleClosePopover}
        className="right-0"
      >
        <div className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-400"
            aria-labelledby="dropdownLargeButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default AccountPopover;
