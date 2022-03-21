import React from 'react';
import { IoColorWand } from "react-icons/io5";
import { useStoreState, useStoreActions } from "./../store";

const FeaturedSnippet: React.FC = () => {

  const originalSnippet = useStoreState(s => s.originalSnippet);
  const updatedSnippet = useStoreState(s => s.updatedSnippet);
  const setShowFSModal = useStoreActions(a => a.setShowFSModal);

  const snippetToDisplay = updatedSnippet ?? originalSnippet;

  if (!snippetToDisplay) {
    return <></>
  }

  const { offset, length } = snippetToDisplay;

  return (
    <div className='rounded-md bg-blue-100 border border-blue-600 p-4 focs:outline-none'>
      <div className='flex flex-row mb-2'>
        <button
          onClick={() => setShowFSModal(true)}
          className='mx-auto my-auto flex flex-row text-blue-600 hover:text-blue-800'>
          <IoColorWand className='my-auto mr-2' /> Train Featured Snippet
        </button>
      </div>
      <div className='bg-white p-4 border border-gray-200 rounded-md'>
        {snippetToDisplay?.resultText &&
          <div className='text-gray-800 text-lg font-medium'>
            {snippetToDisplay.resultText.slice(offset, offset + length)}
          </div>}
        <div className='mt-2 text-sm'>
          {snippetToDisplay.resultText}
        </div>
      </div>
    </div>
  )
}

export default FeaturedSnippet;