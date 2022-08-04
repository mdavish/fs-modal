import React, { useEffect, useState } from 'react';
import axios from "axios";
import { findUpdatedOffset } from "./../utils";
import HighlightedText from "./HighlightedText";
import { useStoreState } from "./../store";

interface HighlightedText {
  offset: number;
  length: number;
}

interface InteractiveTextProps {
  entityId: string;
}
interface EntityResponse {
  meta: {
    id: string
  };
  response: {
    c_body: string;
  }
  onHighlight: (event: HighlightedText) => void;
}

const InteractiveText: React.FC<InteractiveTextProps> = ({
  entityId
}) => {

  const [entityData, setEntityData] = useState<EntityResponse | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const displaySnippet = useStoreState(s => s.displaySnippet);

  useEffect(() => {
    const params = {
      api_key: '54748246e648d315c59bec5b05c61ebb',
      v: '20220101'
    }
    axios.get(`https://liveapi.yext.com/v2/accounts/me/entities/${entityId}`, { params })
      .then(res => {
        setEntityData(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err))
  }, [entityId])

  let updatedOffset: number | undefined = undefined;
  if (entityData && displaySnippet) {
    updatedOffset = findUpdatedOffset(
      entityData.response.c_body,
      displaySnippet.resultText,
      displaySnippet.offset,
    );
  }

  return (
    <div className="mt-3">
      <h3 className="mb-3 text-gray-700 flex flex-roq">Snippet <span className=" text-xs text-gray-500 my-auto ml-4">Highlight text to revise the snippet</span></h3>
      <div className=" shadow-inner bg-gray-50 border border-gray-300 text-xs max-h-64 overflow-auto rounded-lg">
        {
          (!loading && entityData) ?
            <div className='p-4 leading-5 text-gray-800'>
              {
                (displaySnippet?.entity.id === entityId) ?
                  <HighlightedText
                    offset={updatedOffset}
                    length={displaySnippet.length}
                    text={entityData.response.c_body}
                  /> : <HighlightedText text={entityData.response.c_body} />
              }
            </div> : [...Array(10).keys()].map(i => (
              <div key={i} className="rounded-lg mx-4 mt-3 h-4 animate-pulse bg-gray-300" />
            ))
        }
      </div>
    </div>
  )
}

export default InteractiveText;