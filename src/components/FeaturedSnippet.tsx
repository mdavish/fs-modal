import React from 'react';
import { IoColorWand } from "react-icons/io5";
import { useStoreState, useStoreActions } from "./../store";
import ReactMarkdown from "react-markdown";

const FeaturedSnippet: React.FC = () => {

  const displaySnippet = useStoreState(s => s.displaySnippet);
  const status = useStoreState(s => s.status);
  const setShowFSModal = useStoreActions(a => a.setShowFSModal);

  if (!displaySnippet) {
    return <></>
  }

  return (
    <div className='rounded-md bg-blue-100 border border-blue-600 p-4 focs:outline-none'>
      {status === "UNEDITED" &&
        <div className='flex flex-row mb-2'>
          <button
            onClick={() => setShowFSModal(true)}
            className='mx-auto my-auto flex flex-row text-blue-600 hover:text-blue-800 focus:ring-none'>
            <IoColorWand className='my-auto mr-2' /> Train Featured Snippet
          </button>
        </div>
      }
      {
        status === "MODIFIED" &&
        <div className='flex flex-row'>
          <div className='mb-2 mx-auto flex flex-row divide-x divide-blue-800 text-blue-600'>
            <div
              className='pr-4 my-auto flex flex-row  hover:text-blue-800 focus:ring-none'>
              <IoColorWand className='my-auto mr-2' /> Modified
            </div>
            <button onClick={() => setShowFSModal(true)} className='pl-4 my-auto mr-auto hover:underline hover:text-blue-800'>
              Edit Training
            </button>
          </div>
        </div>
      }
      <div className='bg-white p-4 border border-gray-200 rounded-md'>
        {displaySnippet?.value &&
          <div className='text-gray-800 text-lg font-medium'>
            <ReactMarkdown className="prose-sm prose-slate font-light">
              {displaySnippet.value || ""}
            </ReactMarkdown>
          </div>}
        <div className="font-light">
          From <a href="#" className="font-medium text-blue-600 hover:underline">{displaySnippet.entity.name}</a>
        </div>
      </div>
    </div >
  )
}

export default FeaturedSnippet;