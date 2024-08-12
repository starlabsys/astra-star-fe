"use client";
import React from 'react'
import { BsArrowLeftShort, BsChevronDown, BsSearch } from 'react-icons/bs'
import {AiFillEnvironment} from 'react-icons/ai'
import { RiDashboardFill } from "react-icons/ri";
import Image from 'next/image';

const SidebarNavigation = () => {
  const [isOpen, setIsOpen] = React.useState(true)
  const [subMenuOpen, setSubMenuOpen] = React.useState(false)
  const Menus = [
    {
      'name': 'Dashboard',
      'icon': 'AiFillEnvironment',
      'link': '/dashboard'
    },{
      'name': 'Master Data PKB',
      'icon': 'AiFillEnvironment',
      'link': '/profile'
    },
    // {
    //   'name': 'Settings',
    //   'icon': 'AiFillEnvironment',
    //   'link': '/settings',
    //   'subMenus': [
    //     {
    //       'name': 'Profile',
    //       'link': '/profile'
    //     },{
    //       'name': 'Account',
    //       'link': '/account'
    //     }
    //   ]
    // }
  ]
  return (
    <div className={`bg-gray-50 h-screen border-r-2 border-gray-200 p-5 pt-8 ${isOpen ? "w-72" : "w-20"} duration-300 relative`}>
        <BsArrowLeftShort className={`bg-blue-300 text-white text-3xl rounded-full absolute -right-3 top-9 cursor-pointer ${!isOpen && "duration-300 rotate-180"}`} onClick={()=>setIsOpen(!isOpen)} />
        {/* Sidebar */}
        <div className='inline-flex'>
          <Image src='/images/logo-astra-sidebar.png' alt='' width={200} height={200} />
          {/* <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${isOpen && "rotate-[360deg]"}`} />
          <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!isOpen && 'scale-0'}`}>Tailwind</h1> */}
        </div>

        <div className={`flex items-center rounded-md bg-gray-100 mt-6 ${!isOpen ? "px-2.5" : "px-4"} py-2`}>
          <BsSearch className={`text-black text-lg block float-left cursor-pointer mr-2 ${isOpen && "mr-2"}`} />
          <input type={`search`} className={`text-base bg-transparent w-full text-black focus:outline-none ${!isOpen && "hidden"}`} placeholder='Search...' />
        </div>

        <ul className='pt-2'>
          {Menus.map((menu, index)=>(
            <>
              <li key={index} className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-500 hover:text-white rounded-md mt-2'>
                <span className='text-2xl block float-left'>
                  <RiDashboardFill />
                </span>
                <span className={`text-base font-medium text-black flex-1 ${!isOpen && "hidden"}`}>
                  {menu.name}
                </span>
                {/* {menu.subMenus && isOpen && (
                  <BsChevronDown className={`${subMenuOpen && "rotate-180"}`} onClick={()=>{
                    setSubMenuOpen(!subMenuOpen)
                  }}/>
                )} */}
              </li>
              {/* {menu.subMenus && subMenuOpen && isOpen && (
                <ul>
                  {menu.subMenus.map((subMenu, index)=>(
                    <li key={index} className='text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-gray-500 hover:text-white rounded-md mt-2'>
                      {subMenu.name}
                    </li>
                  ))}
                </ul>
              )} */}
            </>
          ))}
        </ul>
    </div>
  )
}

export default SidebarNavigation