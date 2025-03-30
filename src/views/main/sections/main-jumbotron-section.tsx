'use client';

import { PATH } from '@/shared/constants';
import { Button } from '@nextui-org/react';
import { Sparkles, UploadCloud } from 'lucide-react';

const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    // width="597"
    // height="875"
    viewBox="0 0 597 875"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="107.015"
      y="6.89816"
      width="491.167"
      height="809.067"
      rx="68"
      transform="rotate(7.44061 107.015 6.89816)"
      fill="white"
      stroke="black"
      strokeWidth="4"
    />
    <rect
      x="108.264"
      y="2.24216"
      width="478"
      height="803.283"
      rx="68"
      transform="rotate(7.44061 108.264 2.24216)"
      fill="white"
      stroke="black"
      strokeWidth="4"
    />
    <rect
      x="268.673"
      y="52.4858"
      width="138"
      height="13.5018"
      rx="6.75088"
      transform="rotate(7.20024 268.673 52.4858)"
      fill="black"
    />
    <rect
      x="158.928"
      y="221.462"
      width="142"
      height="150"
      rx="30"
      transform="rotate(7.07218 158.928 221.462)"
      stroke="black"
      strokeWidth="8"
    />
    <rect
      x="343.19"
      y="245.231"
      width="146"
      height="154"
      rx="32"
      transform="rotate(7.07218 343.19 245.231)"
      fill="black"
      stroke="black"
      strokeWidth="4"
    />
  </svg>
);

const MainJumbotronSection = () => {
  // 둘러보기
  const onClickBrowse = () => {
    document.getElementById('main-list-section')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section className="flex w-full py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
          마음에 드는 <span className="font-bold">PWA 앱</span>을
          <br />
          바로 설치해보세요!
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-200">
          설치 없이 즉시 실행 가능한 웹 앱을 한곳에,
          <br />
          <strong>Wepp Store</strong>에서 간편하게
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            size="lg"
            color="default"
            variant="solid"
            className="bg-black text-white rounded-lg"
            onPress={onClickBrowse}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            스토어 둘러보기
          </Button>
          <Button
            size="lg"
            variant="light"
            className="rounded-lg"
            as="a"
            href={PATH.DEVELOPER.MAIN}
          >
            <UploadCloud className="mr-2 h-5 w-5" />내 앱 등록하기
          </Button>
        </div>
      </div>
      <div className="hidden lg:block">
        <PhoneIcon className="w-full max-h-96" />
      </div>
    </section>
  );
};

export default MainJumbotronSection;
