import React from 'react';
import { useSearchState } from '@yext/search-headless-react';
import { IoColorWand } from "react-icons/io5";
import FSModal from './FSModal';
import FeaturedSnippet from './FeaturedSnippet';
import { useStoreState, useStoreActions } from "./../store";


const FSTrainer: React.FC = () => {

  const isLoading = useSearchState(s => s.searchStatus.isLoading);
  const mostRecentSearch = useSearchState(s => s.query.mostRecentSearch);
  const setShowFSModal = useStoreActions(a => a.setShowFSModal);
  const displaySnippet = useStoreState(s => s.displaySnippet);

  if (isLoading || !mostRecentSearch) {
    return <></>
  }

  return (
    <>
      {
        displaySnippet ?
          <FeaturedSnippet /> :
          <div className="bg-blue-100 border border-blue-200 p-4 rounded-lg grid">
            <button
              onClick={() => setShowFSModal(true)}
              className="group grid mx-auto my-auto text-blue-600 hover:text-blue-800 hover:underline focus:outline-none">
              <div className="mx-auto text-4xl ">
                <IoColorWand />
              </div>
              <div className="span mt-4">+ Add Featured Snippet</div>
            </button>
          </div>
      }
      <FSModal />
    </>
  )
}

export default FSTrainer;