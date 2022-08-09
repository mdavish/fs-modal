import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import { BsParagraph } from "react-icons/bs";
import cx from "classnames";

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
  return (
    <div className="flex flex-row">
      <div className="grid group">
        <button
          onMouseEnter={() => isHovering(true)}
          onMouseLeave={() => isHovering(false)}
          onClick={() => onSelect(index)}
          className="mx-auto my-auto"
        >
          <BsParagraph className={cx(
            "my-auto mx-auto mr-2 transition-colors",
            selected ? "text-blue-800" : "text-gray-500 hover:text-blue-700",
          )} />
        </button>
      </div>
      <ReactMarkdown className={cx(
        "prose-xs transition-all delay-100 p-1 w-full",
        (selected && isFirstSelection) && "rounded-t-md",
        (selected && isLastSelection) && "rounded-b-md",
        (hovering && !selected) && "bg-blue-50  ring-1 ring-blue-300 rounded-md",
        selected && "bg-blue-200",
      )}>
        {children}
      </ReactMarkdown>
    </div>
  )
}

export default Paragraph;