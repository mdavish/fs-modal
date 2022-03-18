import React, { useState } from 'react';
import { useAnswersState } from '@yext/answers-headless-react';
import { IoColorWand } from "react-icons/io5";
import FSModal from './FSModal';
import FeaturedSnippet from './FeaturedSnippet';

const FSTrainer: React.FC = () => {

  const [showModal, setShowModal] = useState(false);

  const directAnswer = useAnswersState(s => s.directAnswer);
  const isLoading = useAnswersState(s => s.searchStatus.isLoading);
  const mostRecentSearch = useAnswersState(s => s.query.mostRecentSearch)

  if (isLoading || !mostRecentSearch) {
    return <></>
  }

  return (
    <>
      {
        directAnswer.result ?
          <FeaturedSnippet onTrain={() => setShowModal(true)} /> :
          <div className="bg-blue-100 border border-blue-200 p-4 rounded-lg grid">
            <button
              onClick={() => setShowModal(true)}
              className="group grid mx-auto my-auto text-blue-600 hover:text-blue-800 hover:underline focus:outline-none">
              <div className="mx-auto text-4xl ">
                <IoColorWand />
              </div>
              <div className="span mt-4">+ Add Featured Snippet</div>
            </button>
          </div>
      }
      <FSModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => setShowModal(false)}
      />
    </>
  )
}

export default FSTrainer;