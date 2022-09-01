import { useEffect } from 'react';
import { useStoreState, useStoreActions } from "./../store";
import Paragraph from "./Paragraph";
import { Switch } from "@headlessui/react";
import InteractiveTokens from "./InteractiveTokens";

const InteractiveText = (): JSX.Element => {

  const entityFetchError = useStoreState(s => s.entityFetchError);
  const entityFetchLoading = useStoreState(s => s.entityFetchLoading);
  const getEntityData = useStoreActions(a => a.getEntityData);
  const selectedEntity = useStoreState(s => s.selectedEntity);
  const selectedEntityData = useStoreState(s => s.selectedEntityData);
  const segmentedBody = useStoreState(s => s.segmentedBody);
  const selectedParagraphs = useStoreState(s => s.selectedParagraphs);
  const toggleParagraphSelection = useStoreActions(a => a.toggleParagraphSelection);
  const setEntityFetchError = useStoreActions(a => a.setEntityFetchError);
  const editingRichText = useStoreState(s => s.editingRichText);
  const setEditingRichText = useStoreActions(a => a.setEditingRichText);

  let firstSelection: number;
  let lastSelection: number;
  if (selectedParagraphs) {
    firstSelection = Math.min(...selectedParagraphs);
    lastSelection = Math.max(...selectedParagraphs);
  }

  useEffect(() => {
    if (selectedEntity?.id) {
      getEntityData(selectedEntity.id);
    } else {
      console.warn("Entity ID is missing. Something is wrong.");
      setEntityFetchError(true);
    }
  }, [selectedEntity])


  return (
    <div className="mt-3">
      <h3 className="mb-3 text-gray-700 flex flex-roq">Snippet <span className=" text-xs text-gray-500 my-auto ml-4">Highlight text to revise the snippet</span></h3>
      <div className="shadow-inner bg-gray-50 border border-gray-300 text-xs h-full overflow-auto rounded-lg max-h-96">
        <div className="z-50 sticky top-0 bg-gray-200 border-b border-gray-300 py-2 pr-4 text-sm flex flex-row shadow-sm">
          <p className="ml-auto my-auto text-gray-800 mr-4">
            Edit As Rich Text
          </p>
          <Switch
            checked={editingRichText}
            onChange={setEditingRichText}
            className={`${editingRichText ? 'bg-gray-800' : 'bg-gray-400'}
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${editingRichText ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
        {
          (!entityFetchLoading && !entityFetchError && selectedEntityData && segmentedBody) &&
          <div className='p-4 leading-5 text-gray-800'>
            {editingRichText &&
              segmentedBody.map((segment, index) => (
                <Paragraph
                  key={index}
                  selected={selectedParagraphs && selectedParagraphs.includes(index)}
                  onSelect={(index) => { toggleParagraphSelection(index) }}
                  index={index}
                  isFirstSelection={firstSelection === index}
                  isLastSelection={lastSelection === index}
                >
                  {segment}
                </Paragraph>
              )
              )
            }
            {
              !editingRichText &&
              <InteractiveTokens />
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
    </div >
  )
}

export default InteractiveText;