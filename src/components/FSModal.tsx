import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useAnswersState, Result } from "@yext/answers-headless-react";
import { AiOutlineSearch } from "react-icons/ai";
import DropDown from "./DropDown";
import InteractiveText from "./InteractiveText";

interface FSModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const FSModal: React.FC<FSModalProps> = ({ open, onClose, onSave }) => {
  const query = useAnswersState(s => s.query);
  const verticals = useAnswersState(s => s.universal.verticals);
  const directAnswer = useAnswersState(s => s.directAnswer);
  const verticalResults: Result[] = verticals?.[0].results ?? [];
  const dropdownOptions = verticalResults.map(result => ({
    id: result.id as string,
    displayKey: result.name as string,
  }))
  // TODO Select based on featured snippet.
  const [selectedEntity, setSelectedEntity] = useState(dropdownOptions[0]);
  return (
    <Dialog
      className="fixed z-10 inset-0 overflow-y-auto"
      open={open}
      onClose={onClose}>
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
          selectedOption={selectedEntity}
          options={dropdownOptions}
          onChange={(option) => setSelectedEntity(option)} />
        <div className="flex flex-row">
          <div className="w-1/2 pr-3">
            <InteractiveText entityId={selectedEntity.id} />
          </div>
          <div className="w-1/2 pl-3 flex flex-col gap-y-6">
            <div className="w-full mt-3">
              <h3 className="text-gray-600 mb-2">Algorithm's Answer</h3>
              <div className="mt-2 w-full p-2 border border-gray-300 rounded-md">
                {
                  directAnswer.result ?
                    <div>
                      <h3 className="">{directAnswer.result.value}</h3>
                      <p className="pt-2 text-sm"> From <span className="text-blue-800">{directAnswer.result.relatedResult.name}</span></p>
                    </div> : <div className="uppercase text-gray-600">No Answer</div>
                }
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-gray-600 mb-2">Updated Answer</h3>
              <div className="w-full p-2 border border-gray-300 rounded-md">
                {
                  directAnswer.result ?
                    <div>
                      <h3 className="">{directAnswer.result.value}</h3>
                      <p className="pt-2 text-sm"> From <span className="text-blue-800">{directAnswer.result.relatedResult.name}</span></p>
                    </div> : <div className="uppercase text-gray-600">No Answer</div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 w-full flex flex-row">
          <div className="flex flex-row ml-auto gap-x-4 items-center">
            <button onClick={onClose} className="text-blue-900">Cancel</button>
            <button onClick={onSave} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md">Save</button>
          </div>
        </div>
      </div>

    </Dialog>
  )
}

export default FSModal;