import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from "./../store";
import Paragraph from "./Paragraph";
import { canSelectParagraph } from "../utils";

const InteractiveText = (): JSX.Element => {

  const entityFetchError = useStoreState(s => s.entityFetchError);
  const entityFetchLoading = useStoreState(s => s.entityFetchLoading);
  const getEntityData = useStoreActions(a => a.getEntityData);
  const selectedEntity = useStoreState(s => s.selectedEntity);
  const selectedEntityData = useStoreState(s => s.selectedEntityData);
  const segmentedBody = useStoreState(s => s.segmentedBody);
  const selectedParagraphs = useStoreState(s => s.selectedParagraphs);
  const toggleParagraphSelection = useStoreActions(a => a.toggleParagraphSelection);

  useEffect(() => {
    getEntityData(selectedEntity?.id || "");
  }, [selectedEntity])


  return (
    <div className="mt-3">
      <h3 className="mb-3 text-gray-700 flex flex-roq">Snippet <span className=" text-xs text-gray-500 my-auto ml-4">Highlight text to revise the snippet</span></h3>
      <div className=" shadow-inner bg-gray-50 border border-gray-300 text-xs max-h-72 overflow-auto rounded-lg">
        {
          (!entityFetchLoading && !entityFetchError && selectedEntityData && segmentedBody) &&
          <div className='p-4 leading-5 text-gray-800'>
            {
              segmentedBody.map((segment, index) => (
                <Paragraph
                  key={index}
                  selected={selectedParagraphs && selectedParagraphs.includes(index)}
                  onSelect={(index) => { toggleParagraphSelection(index) }}
                  index={index}
                >
                  {segment}
                </Paragraph>
              )
              )
            }
          </div>
        }
        {
          entityFetchLoading &&
          [...Array(10).keys()].map(i => (
            <div key={i} className="rounded-lg mx-4 mt-3 h-4 animate-pulse bg-gray-300" />
          ))
        }
        {
          entityFetchError &&
          <div className="p-4">
            Error fetching Entity.
          </div>
        }
      </div>
    </div>
  )
}

export default InteractiveText;