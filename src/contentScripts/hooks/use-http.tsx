import { useState, useCallback } from 'react'
import axios from 'axios'

const useHttp = () => {
  const serverAddress =
    'https://youtubeextensionfinalprojectserver20210804205040.azurewebsites.net/Song'

  const [errorState, setError] = useState(null)

  const sendRequest = useCallback(
    async (requestPath, applyData, transformData = null, checkData = null) => {
      if (requestPath) {
        try {
          const response = await axios.get(
            `${serverAddress}${requestPath.default}`
          )
          processData(response.data, applyData, transformData, checkData)
        } catch (error) {
          if (requestPath.reserve) {
            try {
              const response = await axios.get(
                `${serverAddress}${requestPath.reserve}`
              )
              processData(response.data, applyData, transformData, checkData)
            } catch (error) {
              applyData(null, 'Not Available')
              setError(error)
            }
          } else {
            applyData(null, 'Not Available')
            setError(error)
          }
        }
      }
    },
    []
  )
  function processData(dataToProcess, applyData, transformData, checkData) {
    if (checkData) {
      const isValid = checkData(dataToProcess)
      if (!isValid) throw new Error('Invalid data')
    }
    const data = transformData ? transformData(dataToProcess) : dataToProcess
    applyData(data, 'Ready')
    setError(null)
  }
  return {
    sendRequest,
    error: errorState,
  }
}

export default useHttp
