import React from "react";

interface HighlightedTextProps {
  text: string,
  offset?: number,
  length?: number,
  onUpdate?: (offset: number, length: number) => void;
  onRemove?: () => void;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  offset,
  length,
}) => {
  return (
    <>
      {
        (offset && length) ?
          <>
            {text.slice(0, offset)}
            <mark className={"bg-blue-200 text-blue-900"}>{text.slice(offset, offset + length)}</mark>
            {text.slice(offset + length, text.length)}
          </> :
          <>{text}</>
      }
    </>
  )
}

export default HighlightedText;