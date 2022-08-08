import { Dialog } from "@headlessui/react";
import { useSearchState, Result } from "@yext/search-headless-react";
import { AiOutlineSearch } from "react-icons/ai";
import DropDown from "./DropDown";
import InteractiveText from "./InteractiveText";
import { useStoreState, useStoreActions } from "./../store";
import ReactMarkdown from "react-markdown";


const FSModal: React.FC = () => {
  const showFSModal = useStoreState(s => s.showFSModal);
  const selectedEntity = useStoreState(s => s.selectedEntity) as { id: string, name: string };
  const displaySnippet = useStoreState(s => s.displaySnippet);
  const originalSnippet = useStoreState(s => s.originalSnippet);
  const status = useStoreState(s => s.status);
  const setShowFSModal = useStoreActions(a => a.setShowFSModal);
  const setSelectedEntity = useStoreActions(a => a.setSelectedEntity);
  const query = useSearchState(s => s.query);
  const verticals = useSearchState(s => s.universal.verticals);
  const verticalResults: Result[] = verticals?.[0].results ?? [];
  const dropdownOptions = verticalResults.map(result => ({
    id: result.id as string,
    displayKey: result.name as string,
  }))
  return (
    <Dialog
      className="fixed z-10 inset-0 overflow-y-auto"
      open={showFSModal}
      onClose={setShowFSModal}>
      <Dialog.Overlay className="fixed w-full h-full grid items-center inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="p-6 relative z-40 mx-auto my-24 bg-white w-2/3 lg:w-1/2 rounded-md">
        <div className="pb-2 border-b border-gray-200">
          <Dialog.Title className="text-xl text-gray-700 font-medium">
            Train Featured Snippets
          </Dialog.Title>
          <Dialog.Description className="text-base text-gray-500">
            Train the algorithm to get smarter!
          </Dialog.Description>
        </div>
        <div className="ml-auto mb-4 flex flex-row bg-gray-100 text-gray-600 m-4 px-4 py-2 rounded-full">
          <span className="my-auto mr-4"><AiOutlineSearch /></span>{query.input}
        </div>
        <h3 className="text-gray-600">Select an Entity</h3>
        <DropDown
          selectedOption={{ displayKey: selectedEntity.name, id: selectedEntity.id }}
          options={dropdownOptions}
          onChange={(option) => setSelectedEntity({ id: option.id, name: option.displayKey })} />
        <div className="flex flex-row">
          <div className="w-1/2 pr-3">
            <InteractiveText />
          </div>
          <div className="w-1/2 pl-3 flex flex-col gap-y-6">
            <div className="w-full mt-3">
              <h3 className="text-gray-600 mb-2">Algorithm's Answer</h3>
              <div className="mt-2 w-full p-2 border border-gray-300 rounded-md list-disc max-h-72 overflow-auto">
                {
                  originalSnippet ?
                    <div>
                      <ReactMarkdown className="prose-sm prose-slate">
                        {originalSnippet.value || ""}
                      </ReactMarkdown>
                      <p className="pt-2 text-sm"> From <span className="text-blue-800">
                        {originalSnippet.entity.name}</span></p>
                    </div> : <div className="uppercase text-gray-600">No Answer</div>
                }
              </div>
            </div>
            {(status !== "UNEDITED") &&
              <div className="w-full">
                <h3 className="text-gray-600 mb-2">Updated Answer</h3>
                <div className="w-full p-2 border border-gray-300 rounded-md">
                  {
                    displaySnippet ?
                      <div>
                        <ReactMarkdown className="prose-sm prose-slate">
                          {displaySnippet.value || ""}
                        </ReactMarkdown>
                        <p className="pt-2 text-sm"> From <span className="text-blue-800">{displaySnippet.entity.name}</span></p>
                      </div> : <div className="uppercase text-gray-600">No Answer</div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
        <div className="mt-2 w-full flex flex-row">
          <div className="flex flex-row ml-auto gap-x-4 items-center">
            <button onClick={() => setShowFSModal(false)} className="text-blue-900">Cancel</button>
            <button onClick={() => setShowFSModal(false)} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md">Save</button>
          </div>
        </div>
      </div>

    </Dialog >
  )
}

export default FSModal;