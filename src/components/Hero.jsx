import axios from "axios"
import { animateScroll } from 'react-scroll';
import { useState } from "react"
import { LuCamera , LuUpload } from "react-icons/lu"

import PieChart from "./PieChart"
import Modal from "./Modal"
import Camera from "./Camera"
import Describe from "./DiseaseDescribe"

const Hero = () => {
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [result, setResult] = useState([])
  const [best, setBest] = useState({})
  const [modalOpen, setModalOpen] = useState(false)

  const handleImageChange = (e) => {
    const pict = URL.createObjectURL(e.target.files[0])
    setFile(e.target.files[0])
    setImage(pict)
  }
  const handleImageShoot = (e) => {
    const pict = URL.createObjectURL(e)
    const pict2 = new File([e], "img.jpg",{type:"image/jpeg", lastModified:new Date().getTime()})
    setFile(pict2)
    setImage(pict)
  }
  const handleBtnClassification = (e) => {
    const formData = new FormData()
    formData.append('image',file)
    // axios.post("http://127.0.0.1:5000", formData,{
    // axios.post("https://corndisease.umgo.ac.id", formData,{
    axios.post("https://apicorndisease.al-muqarrabin.org/", formData,{
      headers:{
        "Content-Type":"multipart/form-data",
      }
    })
    .then((response) => {
      setResult(response.data)
      setBest({
        class: response.data[0][0],
        predict: response.data[0][1]
      })
      animateScroll.scrollTo(809)
    })
    .catch((error) => {
      console.log(error.response)
    })
  }
  return (
    <>
      <Modal open={modalOpen} onClose={()=>setModalOpen(false)}>
        <Camera status={modalOpen} handleImageShoot={handleImageShoot} onClose={()=>{setModalOpen(false)}} />
      </Modal>
      <section className="py-36 w-full table relative bg-top bg-no-repeat" id="home">
        <div className="absolute inset-0 bg-gradient-to-t to-slate-950/50 via-slate-950/75 from-slate-950"></div>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 pb-8">
            <div className="flex flex-col col-span-2 justify-end items-start md:pe-48 mb-10 md:mb-0">
              <h3 className="font-medium leading-normal text-4xl mb-5 mt-10 text-white">
                Upload your image and get the result.
              </h3>
              <p className="text-slate-400 text-lg">
                100% Otomate.
              </p>
            </div>
            <div>
              <div className="flex flex-col rounded-lg p-6 bg-white">
                <div>
                  <img src={image?image:"https://placehold.co/300x200?text=Your+Image"} alt="" className="w-full max-h-[200px]" />
                  {
                    image &&
                      <button className="py-2 px-5 mt-3 block font-normal w-full tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-white rounded-md" onClick={handleBtnClassification}>
                        Detect
                      </button>
                  }
                </div>
                <div className="grid grid-cols-2 gap-2 justify-items-stretch">
                  <div className="border-t-2 mt-4 pt-4">
                    <label htmlFor="uploadedFile" className="mb-1 block text-sm font-medium text-gray-700">Upload file</label>
                    <label htmlFor="uploadedFile" className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-blue-300">
                      <div className="space-y-1 text-center">
                        <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                          <LuUpload/>
                        </div>
                        <div className="text-gray-600"><span className="font-medium text-blue-500 hover:text-blue-700">Click to upload</span></div>
                        <p className="text-sm text-gray-500">PNG, JPG or JPEG</p>
                      </div>
                      <input id="uploadedFile" type="file" className="sr-only" onChange={handleImageChange} />
                    </label>
                  </div>
                  <div className="border-t-2 mt-4 pt-4">
                    <div className="mb-1 block text-sm font-medium text-gray-700" onClick={()=>{setModalOpen(true)}}>Open Camera</div>
                    <div className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-blue-300" onClick={()=>{setModalOpen(true)}}>
                      <div className="space-y-1 text-center">
                        <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                          <LuCamera/>
                        </div>
                        <div className="text-gray-600"><a href="#" className="font-medium text-blue-500 hover:text-blue-700">Click to open camera</a></div>
                        <p className="text-sm text-gray-500">PNG, JPG or JPEG</p>
                      </div>
                      {/* <input id="uploadedFile" type="file" className="sr-only" onChange={handleImageChange} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        result.length > 0 && (
          <section className="py-36 w-full bg-gray-100" id="result">
            <div className="container">
              <div className="grid grid-cols-1 pb-8 text-center">
                <h3 className="mb-6 md:text-2xl text-xl font-medium">Classification Result</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-[30px]">
                <PieChart dataSeries={result} classname="order-2 md:order-1"/>
                <div className="order-1 md:order-2">
                {
                  (best.predict > 90) ?
                  (
                  <div className="flex flex-col gap-5">
                    <div className="bg-green-500 py-3 px-4 rounded-lg text-white">
                      <p className="text-lg md:text-xl">
                        Classification result is <span className="font-semibold uppercase">{best.class}</span> <br />With  <span className="font-semibold uppercase">{best.predict}% similarity</span>
                      </p>
                    </div>
                    {/* <Describe result={best.class} /> */}
                  </div>
                  )
                  : 
                  (
                  <div>
                    <div className="bg-red-500 py-3 px-4 rounded-lg text-white">
                      <p className="text-lg md:text-xl">
                        Classification result is <span className="font-semibold uppercase">{best.class}</span> <br />With <span className="font-semibold uppercase">{best.predict}% similarity</span>
                      </p>
                    </div>
                  </div>
                  )
                }
                </div>
              </div>
              <div className="grid grid-cols-1 mt-8 gap-[30px]">
                <Describe result={best.class} />
              </div>
            </div>
          </section>
        )
      }
    </>
  )
}

export default Hero