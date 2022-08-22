import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import { MdCancel } from "react-icons/md";
import cx from "classnames";
import { useStoreActions } from "./../store";

interface ParagraphProps {
  children: string;
  selected?: boolean;
  index: number;
  onSelect: (index: number) => void;
  isFirstSelection: boolean;
  isLastSelection: boolean;
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  selected,
  index,
  onSelect,
  isFirstSelection,
  isLastSelection,
}) => {
  const [hovering, isHovering] = useState(false);
  const clearSelectedParagraphs = useStoreActions(actions => actions.clearSelectedParagraphs);
  return (
    <div className="flex flex-row">
      <div className="grid group">
        <button
          onMouseEnter={() => isHovering(true)}
          onMouseLeave={() => isHovering(false)}
          className="mx-auto my-auto"
        />
      </div>
      <div className="w-full relative">
        <button
          onClick={() => {
            console.log("Clicking the regular button")
            onSelect(index)
          }}
          onMouseEnter={() => isHovering(true)}
          onMouseLeave={() => isHovering(false)}
          className={cx(
            "text-left w-full",
            "relative prose-xs transition-all delay-100 p-1 w-full",
            (selected && isFirstSelection) && "rounded-t-md",
            (selected && isLastSelection) && "rounded-b-md",
            (hovering && !selected) && "bg-blue-50 ring-1 ring-blue-300 rounded-md",
            selected && "bg-blue-200",
          )}
        >
          <ReactMarkdown
            linkTarget={"__blank"}
          >
            {children}
          </ReactMarkdown>
        </button>
        {
          (selected && isFirstSelection) &&
          <button
            onClick={(event) => {
              console.log("Clicking the X button")
              event.preventDefault();
              clearSelectedParagraphs()
            }}
            className="grid -right-2 -top-2 z-50 absolute rounded-full bg-white" >
            <MdCancel className="text-xl my-auto mx-auto text-gray-700 hover:text-gray-900" />
          </button>
        }
      </div>
    </div >
  )
}

export default Paragraph;