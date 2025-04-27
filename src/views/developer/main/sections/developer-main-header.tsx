'use client';
import { CreateWeppButton } from '@/features/create-wepp';
import { useAuth } from '@/shared/apis/queries/auth';
import { Section } from '@/shared/ui/section';
import { AddWeppHelpButton } from '../ui';

const DeveloperMainHeader = () => {
  const { data: me } = useAuth();

  return (
    <>
      <Section className="flex justify-between">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">
          {me?.userName}님의 앱
        </h2>
        <div className="flex gap-4">
          <AddWeppHelpButton />
          <CreateWeppButton />
        </div>
      </Section>
    </>
  );
};

export default DeveloperMainHeader;
