import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useAnswersState, Result } from "@yext/answers-headless-react";
import { AiOutlineSearch } from "react-icons/ai";
import DropDown, { DropDownOption } from "./DropDown";
import InteractiveText from "./InteractiveText";


interface FSModalProps {
  open: boolean;
  onClose: () => void;
}

const FSModal: React.FC<FSModalProps> = ({ open, onClose }) => {
  const query = useAnswersState(s => s.query);
  const verticals = useAnswersState(s => s.universal.verticals)
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

      <div className="p-6 relative z-40 mx-auto mt-40 bg-white w-1/2 rounded-md">
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
        <div className="flex flex-row">
          <div className="w-1/2">
            <h3 className="text-gray-600">Select an Entity</h3>
            <DropDown
              selectedOption={selectedEntity}
              options={dropdownOptions}
              onChange={(option) => setSelectedEntity(option)} />
            <InteractiveText entityId={selectedEntity.id} />
          </div>
        </div>
      </div>

    </Dialog>
  )
}

export default FSModal;