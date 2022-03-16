import React from 'react';
import { useAnswersState } from "@yext/answers-headless-react";
import { IoColorWand } from "react-icons/io5";

interface FeaturedSnippetProps {
  onTrain: () => void;
}

interface FS {
  result: {
    value?: string;
    snippet: {
      value: string;
      matchedSubstrings: {
        offset: number;
        length: number;
      }[]
    }
  }
}

const FeaturedSnippet: React.FC<FeaturedSnippetProps> = ({ onTrain }) => {
  const directAnswer = useAnswersState(s => s.directAnswer) as FS;

  if (!directAnswer.result) {
    return <></>
  }

  console.log({ directAnswer })

  return (
    <div className='rounded-md bg-blue-100 border border-blue-600 p-4 focs:outline-none'>
      <div className='flex flex-row mb-2'>
        <button
          onClick={onTrain}
          className='mx-auto my-auto flex flex-row text-blue-600 hover:text-blue-800'>
          <IoColorWand className='my-auto mr-2' /> Train Featured Snippet
        </button>
      </div>
      <div className='bg-white p-4 border border-gray-200 rounded-md'>
        {directAnswer.result.value &&
          <div className='text-gray-800 text-lg font-medium'>
            {directAnswer.result.value}
          </div>}
        <div className='mt-2 text-sm'>
          {directAnswer.result.snippet.value}
        </div>
      </div>
    </div>
  )
}

export default FeaturedSnippet;