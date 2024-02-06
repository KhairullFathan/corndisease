import React from 'react'
import { Link } from "react-router-dom"
import {FaHeart} from "react-icons/fa"

const Footer = () =>{

  return (
    <footer className="footer bg-slate-950 relative text-gray-200 dark:text-gray-200">
      <div className="py-[30px] px-0 border-t border-slate-800">
        <div className="container text-center">
          <div className="grid md:grid-cols-12 items-center">
            <div className="md:col-span-6">
              <div className="md:text-start text-center">
                <p className="text-gray-400">©
                  {new Date().getFullYear()} Corn Disease Classification. Design & Develop with <span className="mdi mdi-heart text-red-700"><FaHeart className='inline-block' /></span> by <Link to="https://www.instagram.com/mohamadilyasabas/" target="_blank" className="text-blue-700 font-bold">Ilyas Abas</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer
