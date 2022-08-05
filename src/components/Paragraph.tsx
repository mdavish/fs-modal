import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import { BsParagraph } from "react-icons/bs";
import cx from "classnames";

interface ParagraphProps {
  children: string;
  selected?: boolean;
  index: number;
  onSelect: (index: number) => void;
  selectionDisabled: boolean;
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  selected,
  index,
  onSelect,
  selectionDisabled,
}) => {
  const [hovering, isHovering] = useState(false);
  return (
    <div className="flex flex-row">
      <div className="grid group">
        <button
          disabled={selectionDisabled}
          onMouseEnter={() => isHovering(true)}
          onMouseLeave={() => isHovering(false)}
          onClick={() => onSelect(index)}
          className="mx-auto my-auto"
        >
          <BsParagraph className={cx(
            "my-auto mx-auto mr-2",
            (selectionDisabled && !selected) ? "text-gray-300" : "text-gray-500",
            selected && "text-blue-800",
          )} />
        </button>
      </div>
      <ReactMarkdown className={cx(
        "prose-xs transition-all delay-100 rounded-md p-1 w-full",
        (hovering && !selected) && "bg-blue-50 ring-1 ring-blue-200",
        selected && "bg-blue-200 ring-1 ring-blue-300",
      )}>
        {children}
      </ReactMarkdown>
    </div>
  )
}

export default Paragraph;