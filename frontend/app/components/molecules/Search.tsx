import React from 'react'

const Search = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-[800px]">
        <input
          type="text"
          className="w-full pl-10 py-4 border border-gray-300 rounded-full shadow-md focus:outline-none"
          placeholder="検索機能は開発中です..."
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z" />
        </svg>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 font-semibold py-2 px-5 rounded-full transition duration-150"
          aria-label="検索"
        >
          検索
        </button>
      </div>
    </div>
  )
}

export default Search
