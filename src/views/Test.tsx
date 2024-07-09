// @ts-nocheck
'use client';
import React, { useState } from 'react';

const AppCard = ({ app }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
    <div className="w-16 h-16 bg-gray-200 rounded-lg mb-2 self-center"></div>
    <h3 className="font-semibold text-sm mb-1">{app.name}</h3>
    <p className="text-xs text-gray-500 mb-2">{app.category}</p>
    <div className="flex items-center justify-between mt-auto">
      <span className="text-xs font-semibold text-blue-500">무료</span>
      <button className="bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded">
        받기
      </button>
    </div>
  </div>
);

const FeaturedApp = ({ app }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex">
    <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4"></div>
    <div className="flex flex-col justify-between">
      <div>
        <h3 className="font-semibold mb-1">{app.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{app.description}</p>
      </div>
      <button className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded self-start">
        받기
      </button>
    </div>
  </div>
);

const CategoryButton = ({ category }) => (
  <button className="bg-gray-100 text-gray-800 text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-200">
    {category}
  </button>
);

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="앱 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full"
        >
          검색
        </button>
      </div>
    </form>
  );
};

const SearchResults = ({ results }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">검색 결과</h2>
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {results.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  </div>
);

const AppStoreHomeScreen = () => {
  const [searchResults, setSearchResults] = useState(null);

  const featuredApps = [
    { id: 1, name: '슈퍼 게임', description: '흥미진진한 액션 어드벤처 게임' },
    {
      id: 2,
      name: '프로덕티비티 마스터',
      description: '당신의 일상을 효율적으로 관리하세요',
    },
  ];

  const popularApps = [
    { id: 1, name: '인기 앱 1', category: '엔터테인먼트' },
    { id: 2, name: '인기 앱 2', category: '생산성' },
    { id: 3, name: '인기 앱 3', category: '교육' },
    { id: 4, name: '인기 앱 4', category: '게임' },
  ];

  const categories = [
    '게임',
    '생산성',
    '교육',
    '엔터테인먼트',
    '소셜 네트워킹',
    '건강 및 피트니스',
  ];

  const handleSearch = (query) => {
    // 실제로는 API를 호출하여 검색 결과를 가져와야 합니다.
    // 여기서는 간단한 예시로 구현합니다.
    const results = popularApps.filter(
      (app) =>
        app.name.toLowerCase().includes(query.toLowerCase()) ||
        app.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">앱스토어</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {searchResults && <SearchResults results={searchResults} />}

        {!searchResults && (
          <>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">추천 앱</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {featuredApps.map((app) => (
                  <FeaturedApp key={app.id} app={app} />
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">카테고리</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <CategoryButton key={category} category={category} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">인기 앱</h2>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {popularApps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          &copy; 2024 앱스토어. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AppStoreHomeScreen;
