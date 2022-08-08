import React, { ReactEventHandler } from "react";
import { useStoreActions, useStoreState } from "../store";

interface HighlightedTextProps {
  text: string,
  offset?: number,
  length?: number,
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  offset,
  length,
}) => {

  const selectedEntity = useStoreState(s => s.selectedEntity);
  // const handleSelection: ReactEventHandler<HTMLDivElement> = () => {
  //   const selection = window.getSelection();
  //   if (selection) {
  //     const offset = selection?.anchorOffset;
  //     const length = selection?.toString().length;
  //     setUpdatedSnippet({
  //       entity: {
  //         id: selectedEntity?.id as string,
  //         name: selectedEntity?.name as string,
  //       },
  //       offset,
  //       length,
  //       resultText: text.slice(Math.max(offset - 250, 0), offset + length + 250),
  //     });
  //   }
  // }

  return (
    <div
    // onMouseUp={handleSelection}
    >
      {
        (offset && length) ?
          <>
            {text.slice(0, offset)}
            <mark className={"bg-blue-200 text-blue-900"}>{text.slice(offset, offset + length)}</mark>
            {text.slice(offset + length, text.length)}
          </> :
          <>{text}</>
      }
    </div>
  )
}

export default HighlightedText;