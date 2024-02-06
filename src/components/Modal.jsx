import { useEffect } from "react"
import {FaTimes} from "react-icons/fa"

const Modal = (props) => {
  const {open, onClose, children} = props
  useEffect(() => {
    document.addEventListener('mousedown', handleClickListener)
    return () => {
      document.removeEventListener('mousedown', handleClickListener)
    };
  }, []);
  const handleClickListener = (e) => {
    const modal = document.getElementById('modal')
    console.log()
    if(!modal.contains(e.target)) {
      onClose()
    }
  }


  return (
    // backdrop
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20 z-999':'invisible'}`}>
      {/* modal */}
      <div className={`bg-white rounded-xl shadow-lg p-6 transition-all w-[90%] lg:w-1/3 ${open ? 'scale-100 opacity-100':'scale-125 opacity-0'}`} id="modal">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <FaTimes/>
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal