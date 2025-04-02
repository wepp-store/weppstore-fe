import { useFindUserMutate } from '@/shared/apis/queries/user';
import { IWepp } from '@/shared/types';
import { Section } from '@/shared/ui/section';
import { Button, Input, User } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

const UpdateWeppOtherDevelopersSection = () => {
  const [email, setEmail] = React.useState<string>('');
  const { watch, setValue } = useFormContext<IWepp>();

  const addMutation = useFindUserMutate();

  const otherDevelopers = watch('otherDevelopers');

  const onAddOtherDeveloper = () => {
    if (!email) return;
    if (watch('developer').email === email) {
      toast.error('개발자 본인은 추가할 수 없습니다.');
      setEmail('');
      return;
    }
    if (otherDevelopers?.some((developer) => developer.email === email)) {
      toast.error('이미 추가된 개발자입니다.');
      setEmail('');
      return;
    }
    addMutation.mutate(
      { email },
      {
        onSuccess: (data) => {
          setValue('otherDevelopers', [...(otherDevelopers ?? []), data]);
          setEmail('');
        },
      }
    );
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddOtherDeveloper();
    }
  };

  const validateEmail = (value: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value);
  };

  const isInvalid = !!email && !validateEmail(email);

  return (
    <Section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-4">다른 개발자 추가</h2>
      <p>다른 개발자를 추가하여 앱을 공동 관리할 수 있습니다.</p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={onKeyUp}
            isInvalid={isInvalid}
            errorMessage={isInvalid ? '올바른 이메일 형식이 아닙니다.' : ''}
          />
          <Button
            className="flex items-center"
            onPress={onAddOtherDeveloper}
            isLoading={addMutation.isPending}
            isDisabled={isInvalid}
          >
            추가하기
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {otherDevelopers?.map((developer, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded-lg border-gray-300"
            >
              <User
                avatarProps={{
                  src: developer.profileUrl ?? '/no-image.svg',
                }}
                description={developer.email}
                name={developer.userName}
              />
              <Button
                variant="light"
                onPress={() => {
                  setValue(
                    'otherDevelopers',
                    otherDevelopers.filter((_, i) => i !== index)
                  );
                }}
              >
                삭제
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default UpdateWeppOtherDevelopersSection;
