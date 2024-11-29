import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">
        요청하신 페이지를 찾을 수 없습니다.
      </h2>
      <Link href="/" className="text-blue-500">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
