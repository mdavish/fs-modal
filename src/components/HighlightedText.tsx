import React, { ReactEventHandler } from "react";

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

  const handleSelection: ReactEventHandler<HTMLDivElement> = () => {
    const selection = window.getSelection();
    const offset = selection?.anchorOffset;
  }

  return (
    <div onSelect={handleSelection}>
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