'use client';
import { CreateWeppButton } from '@/features/create-wepp';
import { useAuth } from '@/shared/apis/queries/auth';
import { Section } from '@/shared/ui/section';

const DeveloperMainHeader = () => {
  const { data: me } = useAuth();

  return (
    <>
      <Section className="flex justify-between">
        <h2
          className="
          text-3xl
          font-bold
          text-gray-800
          mb-4
          "
        >
          {me?.userName}님의 앱
        </h2>

        <CreateWeppButton />
      </Section>
    </>
  );
};

export default DeveloperMainHeader;
