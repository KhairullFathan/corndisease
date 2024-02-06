import  {useState, useEffect} from 'react'
import Webcam from "react-webcam"



const videoConstraints = {
  width: 500,
  height: 300,
}

const Camera = (props) => {
  const {status, handleImageShoot, onClose} = props
  const [deviceId, setDeviceId] = useState(null)
  const [devices, setDevices] = useState([])

  const handleDevices = (mediaDevices) => {
    setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  }

  useEffect(()=>{
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  },[devices])

  return (
    <>
      <div>
        <select name="selecDevice" id="selecDevice" className='w-full my-5 border border-gray-300 rounded-md p-2 focus:border-blue-500' onChange={(e)=>{setDeviceId(e.target.value)}}>
          <option value="">Choose Camera</option>
          {
            devices?.map((e,i)=>{
              return (
                <option key={e.deviceId} value={e.deviceId}>{e.label}</option>
              )
            })
          }
        </select>
      </div>
      {
        (status) &&
          <Webcam
            className="mx-auto"
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{...videoConstraints, deviceId: deviceId}}
          >
            {({ getScreenshot }) => (
              <button
                className='w-full bg-blue-700 text-white my-3 rounded-lg py-2'
                onClick={() => {
                  const imageSrc = getScreenshot()

                  fetch(imageSrc)
                  .then((res)=>{
                    return res.blob()
                  })
                  .then((blob) => {
                    handleImageShoot(blob)
                    onClose(false)
                  })
                  .catch((err)=>{
                    console.log(err)
                  })
                }}
              >
                Capture photo
              </button>
            )}
          </Webcam>
      }
    </>
  )
}

export default Camera