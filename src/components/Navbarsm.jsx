import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Link as Link1 } from 'react-scroll'
import logo from '../assets/images/logo.png'
import { AiOutlineMenu } from "react-icons/ai";

const Navbarsm = () => {
  const [isOpen, setMenu] = useState(true)
  const windowScroll = () =>{
    const navbar = document.getElementById("navbar")
    if ( document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
      if (navbar !== null) {
        navbar?.classList.add("is-sticky");
      }
    } else {
      if (navbar !== null) {
        navbar?.classList.remove("is-sticky");
      }
    }

    const mybutton = document.getElementById("back-to-top");
    if (mybutton != null) {
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        mybutton.classList.add("flex");
        mybutton.classList.remove("hidden");
      } else {
        mybutton.classList.add("hidden");
        mybutton.classList.remove("flex");
      }
    }
  }
  window.addEventListener("scroll", windowScroll)
  const toggleMenu = () => { setMenu(!isOpen)}
  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="container flex flex-wrap items-center justify-end">
          <a className="navbar-brand md:me-8 flex" href="/">
            <img src={logo} alt="Logo" width={50} />
            <div>
              <h3 className='text-white font-medium l-light'>
                Corn Disease <br />
                Classification
              </h3>
              <h3 className='text-black font-medium l-dark'>
                Corn Disease <br />
                Classification
              </h3>
            </div>
          </a>

          <div className="nav-icons flex items-center lg_992:order-2 ms-auto lg:ms-4">
            <button data-collapse="menu-collapse" type="button" onClick={toggleMenu} className="collapse-btn inline-flex items-center ms-3 text-slate-950 dark:text-white lg_992:hidden" aria-controls="menu-collapse" aria-expanded="false">
              <span className="sr-only">Navigation Menu</span>
              <AiOutlineMenu/>
            </button>
          </div>

          <div className={`${isOpen === true ? 'navigation lg_992:order-1 lg_992:flex hidden ms-auto' : 'navigation lg_992:order-1 lg_992:flex block ms-auto'}`} id="menu-collapse">
            <ul className="navbar-nav nav-light" id="navbar-navlist">
              <li className={`nav-item`}>
                <Link1 to="home" activeClass="text-blue-700" spy={true} smooth={true} duration={500} className="nav-link">Home</Link1>
              </li>
              <li className={`nav-item`}>
                <Link1 to="class-disease" activeClass="text-blue-700" spy={true} smooth={true} duration={500} className="nav-link">Class Disease</Link1>
              </li>
              <li className={`nav-item`}>
                <Link1 to="spread-map" activeClass="text-blue-700" spy={true} smooth={true} duration={500} className="nav-link">Spread Map</Link1>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbarsm