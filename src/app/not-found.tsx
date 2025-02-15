const NotFound = () => {
  return (
    <div className="size-full flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold text-blue-500">404</h1>
      <p className="text-gray-600 mt-4 mb-8">
        페이지가 존재하지 않거나 접근 권한이 없습니다.
      </p>
      <a
        href="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        홈으로 이동하기
      </a>
    </div>
  );
};

export default NotFound;
