import React from 'react';
import { useAnswersState, FeaturedSnippetDirectAnswer } from "@yext/answers-headless-react";
import { IoColorWand } from "react-icons/io5";

interface FeaturedSnippetProps {
  onTrain: () => void;
}

const FeaturedSnippet: React.FC<FeaturedSnippetProps> = ({ onTrain }) => {
  const directAnswer = useAnswersState(s => s.directAnswer.result) as FeaturedSnippetDirectAnswer;

  if (!directAnswer) {
    return <></>
  }

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
        {directAnswer.value &&
          <div className='text-gray-800 text-lg font-medium'>
            {directAnswer.value}
          </div>}
        <div className='mt-2 text-sm'>
          {directAnswer.snippet.value}
        </div>
      </div>
    </div>
  )
}

export default FeaturedSnippet;