import React, { useState } from 'react';
import { useStoreState, useStoreActions } from './../store';
import cx from "classnames";

interface InteractiveTokensProps {

}

const InteractiveTokens: React.FC<InteractiveTokensProps> = (props) => {

  const [isDragging, setIsDragging] = useState(false);
  const [startIndex, setStartIndex] = useState<number | undefined>();
  const [endIndex, setEndIndex] = useState<number | undefined>();

  const handleMouseEnter = (index: number) => {
    if (startIndex && endIndex && isDragging) {
      if (index > endIndex) {
        setEndIndex(index);
      } else if (index < startIndex) {
        setStartIndex(index);
      } else {
        console.log("no op");
      }
    }
  }

  const handleMouseDown = (index: number) => {
    setStartIndex(index);
    setEndIndex(index);
    setIsDragging(true);
  }

  const handleMouseUp = (index: number) => {
    setIsDragging(false);
  }

  const handleWordSelection = useStoreActions(a => a.handleWordSelection);
  const plainTextBody = useStoreState(s => s.plainTextBody);
  const tokenizedPlainTextBody = useStoreState(s => s.tokenizedPlainTextBody);

  console.log({
    startIndex,
    endIndex,
    isDragging,
  })

  if (!tokenizedPlainTextBody) {
    throw new Error("No plain text body. Something is wrong");
  }

  return (
    <p className="select-none text-sm tracking-widest">
      {tokenizedPlainTextBody.map((token, index) => (
        <>
          <span
            className={cx(
              "cursor-pointer",
              (startIndex && endIndex) && (index >= startIndex && index <= endIndex) ?
                "bg-blue-200 text-blue-900" : "hover:bg-blue-100",
            )}
            key={index}>
            <button
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseUp={() => handleMouseUp(index)}
            >
              {token}
            </button>
          </span>
          <span
            className={cx(
              "cursor-pointer overflow-auto h-full",
              (startIndex && endIndex) && (index >= startIndex && index <= endIndex) && "bg-blue-200 text-blue-900",
            )}
          > </span>
        </>
      ))}
    </p>
  )
}

export default InteractiveTokens;