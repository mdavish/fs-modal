import React, { useEffect, useState } from 'react';
import axios from "axios";

interface InteractiveTextProps {
  entityId: string;
}

interface EntityResponse {
  meta: object;
  response: {
    c_body: string;
  }
}

const InteractiveText: React.FC<InteractiveTextProps> = ({ entityId }) => {
  const [entityData, setEntityData] = useState<EntityResponse | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const params = {
      api_key: '54748246e648d315c59bec5b05c61ebb',
      v: '20220101'
    }
    axios.get(`https://liveapi.yext.com/v2/accounts/me/entities/${entityId}`, { params })
      .then(res => {
        console.log(res);
        setEntityData(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err))
  }, [entityId])
  return (
    <div>
      <div className="mt-3 shadow-inner bg-gray-50 border border-gray-300 text-xs max-h-48 overflow-auto rounded-lg">
        {
          (!loading) ?
            <div className='p-4 leading-5 text-gray-800'>
              {entityData?.response?.c_body}
            </div> : [...Array(10).keys()].map(i => (
              <div className="rounded-lg mx-4 mt-3 h-4 animate-pulse bg-gray-300" />
            ))
        }
      </div>
    </div>
  )
}

export default InteractiveText;